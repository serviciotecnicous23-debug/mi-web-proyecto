/**
 * «¿Quién es sabio?» (shared/sabio.ts): el concurso de la casa de la sabiduría, en pantalla completa. Un
 * escenario oscuro con luces, el presentador (Etán ezraíta), las quince gradas, el reloj, los comodines, la
 * última palabra con suspenso, la respuesta con su cita, las tablas y los trajes de los sabios.
 * El servidor corrige: aquí nunca está la respuesta antes de contestar.
 */
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Eye, ListOrdered, Loader2, Lock, Moon, Pause, PhoneCall, ScrollText, Shirt, Trophy, Volume2, VolumeX, X } from "lucide-react";
import { Portrait } from "./Portrait";
import { gameStore } from "./store";
import { CiudadCtx } from "./CiudadUI";
import { sonido } from "./sabio-sonido";
import { sabioRed } from "./sabio-red";
import { ICONO_CAMINO } from "./barrio-chat";
import { LETRAS, LogoSabio, Presentador, RELACION, Reloj, miles, pedir, primerNombre, useVertical } from "./sabio-comun";
import { DuelosLobby, DueloView } from "./SabioDuelo";
import { NocheEntrada, NocheView } from "./SabioNoche";
import { NombreConRegistro } from "./RegistroUI";
import { EstudioSabio3D } from "./estudio/EstudioSabio3D";
import type { EstudioSabio } from "./estudio/estudio-sabio";
import {
  APLAUSOS, COMODINES, CONSEJOS_FAJA, DUDA_S, ENTRADAS_DIA, FRASES_PRESENTADOR, GOZO_CONSEJO, GOZO_SABIO_DIA, GRADAS, GRADAS_SEGURAS, LLAMADA_S, MEDALLAS, NOMBRE_CONCURSO,
  ORDEN_COMODINES, PREMIO_SEMANA, PUNTOS_GRADA, TABLAS, TITULOS, TRAJES_SABIOS, VERSO_CASA, VERSO_CONCURSO, VERSO_CONSEJO, VERSO_PUBLICO, VERSO_TRAJES, canticoGrada,
  comoTermino, dificultadGrada, segundosGrada, suspensoMs, tardaMucho, tiempoCorto,
  DUELO_RONDAS, DUELOS_MANTO,
  type AmigoPosible, type AplausoId, type Comodin, type ConsejoAmigo, type DueloVista, type EnVivo, type FinPartida, type MirarVista, type PartidaEnTabla, type PartidaVista,
  type PreguntaVista, type PublicoVista, type RespuestaSabio, type SabioEstado, type TablaDe, type TablaVista,
} from "@shared/sabio";
import { NOMBRE_NOCHE, NOCHE_MAX, NOCHE_MIN, type NocheEnVivo, type NocheVista } from "@shared/sabio-noche";
import { Ico } from "./iconos";

const azar = <T,>(l: T[]) => l[Math.floor(Math.random() * l.length)];

/** Los aplausos que llegan flotan sobre la pantalla un momento. */
type Flota = { id: number; icono: string; x: number; tipo: AplausoId };
let flotaId = 0;
function nuevosAplausos(antes: PublicoVista | null, ahora: PublicoVista): Flota[] {
  if (!antes || ahora.ultimo <= antes.ultimo) return [];
  const out: Flota[] = [];
  for (const a of APLAUSOS) {
    const n = Math.max(0, (ahora.aplausos[a.id] ?? 0) - (antes.aplausos[a.id] ?? 0));
    for (let k = 0; k < Math.min(4, n); k++) out.push({ id: ++flotaId, icono: a.icono, x: 8 + Math.random() * 84, tipo: a.id });
  }
  // si los conteos no subieron (se fueron los viejos), igual se ve que alguien aplaudió
  if (!out.length) out.push({ id: ++flotaId, icono: "👏", x: 8 + Math.random() * 84, tipo: "aplauso" });
  return out;
}

type Fase =
  | "cargando" | "portada" | "entre" | "pregunta" | "confirmar" | "duda" | "suspenso" | "revelado" | "fin" | "mirando" | "duelos" | "duelo" | "noches" | "noche" | "noche-mirar"
  | "error";
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
  // el duelo de sabios (SabioDuelo.tsx) y la noche de los sabios (SabioNoche.tsx)
  const [dueloId, setDueloId] = useState<number | null>(null);
  const [nocheId, setNocheId] = useState<number | null>(null);
  // la escena de la duda con Etán: lo que dice y el reloj detenido mientras habla
  const [fraseDuda, setFraseDuda] = useState<string | null>(null);
  const [congelado, setCongelado] = useState<number | null>(null);
  /** La pregunta en que ya salió la escena (una vez por pregunta). */
  const dudaPedida = useRef<string | null>(null);
  const dudaTimers = useRef<number[]>([]);
  const pararLatido = useRef<() => void>(() => undefined);
  const pararRedoble = useRef<() => void>(() => undefined);
  const pararSuspenso = useRef<() => void>(() => undefined);
  const finTiempo = useRef<number>(0);
  const finLlamada = useRef<number>(0);
  const vivo = useRef(true);
  // el estudio 3D detrás de la pantalla (si el equipo puede)
  const estudio = useRef<EstudioSabio | null>(null);
  const verEstudio = useCallback(() => estudio.current, []);
  const [hay3d, setHay3d] = useState(false);
  const vertical = useVertical();

  const cargar = useCallback(async () => {
    const r = await pedir<SabioEstado>("");
    if (!vivo.current) return;
    if (!r.ok || !r.data) {
      setError(r.data?.message || "No se pudo abrir la casa de la sabiduría. Revisa tu conexión.");
      setFase("error");
      return;
    }
    setEstado(r.data);
    const dr = await pedir<{ duelo: DueloVista | null }>("/duelo");
    if (!vivo.current) return;
    if (dr.ok && dr.data?.duelo && (dr.data.duelo.estado === "jugando" || dr.data.duelo.estado === "invitado")) {
      setDueloId(dr.data.duelo.id);
      setFase("duelo");
      return;
    }
    // si está en una sala o en una noche de los sabios, vuelve a ella
    const nr = await pedir<{ noche: NocheVista | null }>("/noche");
    if (!vivo.current) return;
    if (nr.ok && nr.data?.noche) {
      setNocheId(nr.data.noche.id);
      setFase("noche");
      return;
    }
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
      pararLatido.current();
      pararRedoble.current();
      for (const t of dudaTimers.current) clearTimeout(t);
    };
  }, [cargar]);

  // se entró a una noche desde la invitación (en la tarjeta de arriba): a la sala
  useEffect(
    () =>
      sabioRed.onAbrirNoche((id) => {
        setNocheId(id);
        setFase("noche");
      }),
    [],
  );

  // con el estudio en 3D, la sala tiene su murmullo
  useEffect(() => {
    if (!hay3d || !conSonido) return;
    return sonido.murmullo();
  }, [hay3d, conSonido]);

  // se aceptó un reto (en la tarjeta de arriba): a la pantalla del duelo
  useEffect(
    () =>
      sabioRed.onAbrirDuelo((id) => {
        setDueloId(id);
        setFase("duelo");
      }),
    [],
  );

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
  const jugandoId = partida && (fase === "entre" || fase === "pregunta" || fase === "confirmar" || fase === "duda" || fase === "suspenso" || fase === "revelado") ? partida.id : null;
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
      estudio.current?.setMirando(r.data.publico.nombres ?? []);
      if (nuevos.length) {
        sonido.aplauso();
        for (const n of nuevos.slice(0, 3)) estudio.current?.aplauso(n.tipo);
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
    // la escena de la duda: la primera vez que se elige en esta pregunta, si tocaba (lo decidió el servidor al
    // mostrarla) o si ya pensó más del 60 % del reloj. Nunca mira cuál se eligió: aquí no se sabe la respuesta.
    const q = qVista;
    if (q && fase === "pregunta" && dudaPedida.current !== q.texto && q.duda !== "hecha" && !partida?.llamada) {
      const pasados = q.segundos - Math.max(0, (finTiempo.current - Date.now()) / 1000);
      if (q.duda === "toca" || tardaMucho(pasados, q.segundos)) {
        void empezarDuda(q);
        return;
      }
    }
    setDice(FRASES_PRESENTADOR.ultima);
    setFase("confirmar");
  }

  /** La escena de la duda con Etán: frente a frente, luego Etán de cerca con el latido. El reloj se detiene mientras habla. */
  async function empezarDuda(q: PreguntaVista) {
    dudaPedida.current = q.texto;
    const quedan = Math.max(0, Math.ceil((finTiempo.current - Date.now()) / 1000));
    setCongelado(quedan);
    setFraseDuda(null);
    setDice("…");
    setFase("duda");
    pararSuspenso.current();
    pararLatido.current();
    pararLatido.current = sonido.latido();
    const desde = Date.now();
    const r = await pedir<{ frase: string; partida: PartidaVista }>("/duda", {});
    if (!vivo.current || faseRef.current !== "duda") return;
    if (!r.ok || !r.data?.partida?.pregunta) {
      // el servidor no la dio (por ejemplo, se acabó el tiempo): la última palabra de siempre, con el reloj corriendo
      terminarDuda(FRASES_PRESENTADOR.ultima);
      return;
    }
    // el servidor devolvió los segundos de la escena: el reloj sigue después desde el mismo número
    const p = r.data.partida;
    finTiempo.current = Date.now() + p.pregunta!.restantes * 1000;
    setPartida(p);
    setQVista(p.pregunta);
    const frase = r.data.frase;
    const plano = Math.max(0, 1500 - (Date.now() - desde));
    dudaTimers.current.push(
      window.setTimeout(() => {
        if (faseRef.current !== "duda") return;
        setFraseDuda(frase);
        setDice(frase);
      }, plano),
      window.setTimeout(() => {
        if (faseRef.current === "duda") terminarDuda(frase);
      }, DUDA_S * 1000 - (Date.now() - desde)),
    );
  }

  /** Termina la escena: vuelve el reloj y la música de la pregunta; queda la elegida para confirmar o cambiar. */
  function terminarDuda(dice?: string, a: Fase = "confirmar") {
    for (const t of dudaTimers.current) clearTimeout(t);
    dudaTimers.current = [];
    pararLatido.current();
    pararLatido.current = () => undefined;
    setCongelado(null);
    setFraseDuda(null);
    if (dice) setDice(dice);
    if (a !== "suspenso" && qVista) {
      pararSuspenso.current();
      pararSuspenso.current = sonido.suspenso(qVista.n);
    }
    setFase(a);
  }

  /** Quiere cambiar su respuesta (en la última palabra o en la escena con Etán). */
  function cambiar() {
    setElegida(null);
    if (faseRef.current === "duda") terminarDuda("Piénsalo bien…", "pregunta");
    else {
      setDice("Piénsalo bien…");
      setFase("pregunta");
    }
  }

  async function confirmar() {
    if (elegida === null || !qVista) return;
    const q = qVista;
    if (faseRef.current === "duda") terminarDuda(undefined, "suspenso");
    // las luces bajan, cae el foco sobre el atril y suena el redoble: el suspenso crece con la grada
    const ms = suspensoMs(q.n);
    setFase("suspenso");
    pararSuspenso.current();
    sonido.fijar();
    pararRedoble.current();
    pararRedoble.current = sonido.redoble(ms);
    setDice("…");
    const espera = new Promise((r) => setTimeout(r, ms));
    const [r] = await Promise.all([pedir<RespuestaSabio>("/responder", { opcion: q.opciones[elegida] }), espera]);
    if (!vivo.current) return;
    pararRedoble.current();
    if (!r.ok || !r.data) {
      setAviso(r.data?.message || "No se pudo enviar la respuesta. Revisa tu conexión.");
      pararSuspenso.current = sonido.suspenso(q.n);
      setFase("pregunta");
      return;
    }
    sonido.golpe();
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
    // verde con destellos dorados, o rojo con apagón
    if (d.correcta) {
      sonido.ovacion(d.fin?.estado === "gano" ? 6 : 2.6, d.fin?.estado === "gano" ? 1.6 : 1);
      sonido.destellos();
    } else {
      sonido.oh();
      if (elegidaI >= 0) sonido.apagon();
    }
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
    setNocheId(null);
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

  // el estudio sigue lo que pasa en el programa: tomas, luces, público y la pantalla grande
  const pintarPregunta = useCallback(
    (e: EstudioSabio) => {
      if (!qVista) return;
      e.mostrarPregunta({
        n: qVista.n,
        texto: qVista.texto,
        opciones: qVista.opciones,
        quitadas: qVista.quitadas,
        elegida: revelado ? null : elegida,
        correcta: revelado ? revelado.correcta : null,
        mala: revelado && !revelado.bien && revelado.elegida >= 0 ? revelado.elegida : null,
      });
    },
    [qVista, elegida, revelado],
  );
  useEffect(() => {
    const e = estudio.current;
    if (!e) return;
    const grada = partida?.grada ?? 0;
    if (fase === "entre" && partida) {
      e.setFase("entre", { grada });
      e.mostrarGrada(grada + 1);
    } else if ((fase === "pregunta" || fase === "confirmar" || fase === "duda" || fase === "suspenso") && qVista) {
      e.setFase(fase, { grada: qVista.n - 1, dur: suspensoMs(qVista.n) / 1000 });
      pintarPregunta(e);
    } else if (fase === "revelado" && revelado && qVista) {
      const gano = fin?.estado === "gano";
      const segura = revelado.bien && (GRADAS_SEGURAS as readonly number[]).includes(grada);
      e.setFase(revelado.bien ? (gano ? "gano" : segura ? "segura" : "bien") : "mal", { grada: gano ? GRADAS : revelado.bien ? grada : qVista.n - 1 });
      pintarPregunta(e);
    } else if (fase === "fin" && fin) {
      e.setFase(fin.estado === "gano" ? "gano" : "fin", { grada: fin.estado === "gano" ? GRADAS : fin.grada });
      e.mostrarMensaje(
        fin.estado === "gano" ? "¡Sabio de las quince gradas!" : `${miles(fin.puntos)} puntos`,
        fin.estado === "retiro" ? "Se retiró con lo ganado" : fin.estado === "gano" ? "Santiago 3:13" : `Se queda en la grada ${fin.grada}`,
      );
    } else if (fase === "portada" || fase === "cargando" || fase === "duelos" || fase === "noches" || fase === "error") {
      e.setFase("portada", { grada: 0 });
      e.mostrarLogo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hay3d, fase, qVista, elegida, revelado, fin, partida?.grada]);
  // la llamada a un amigo se ve en la pantalla grande; al llegar el consejo vuelve la pregunta
  const llamando = partida?.llamada && !revelado && (fase === "pregunta" || fase === "confirmar") ? partida.llamada.nombre : null;
  useEffect(() => {
    const e = estudio.current;
    if (!e) return;
    if (llamando) e.mostrarLlamada(llamando, restaLlamada);
    else if (fase === "pregunta" || fase === "confirmar") pintarPregunta(e);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [llamando, restaLlamada]);
  // el consejo de los ancianos: el público levanta la mano y la pantalla muestra lo que dijeron
  const ancianos = partida?.ancianos && !revelado ? partida.ancianos.join(",") : null;
  useEffect(() => {
    const e = estudio.current;
    if (!e || !ancianos || !qVista) return;
    e.mostrarAncianos(ancianos.split(",").map(Number), qVista.quitadas);
    const t = setTimeout(() => {
      if (estudio.current && faseRef.current === "pregunta") pintarPregunta(estudio.current);
    }, 6000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ancianos]);

  const q = qVista;
  const n = q?.n ?? (partida ? partida.grada + 1 : 1);
  const enJuego = fase === "entre" || fase === "pregunta" || fase === "confirmar" || fase === "duda" || fase === "suspenso" || fase === "revelado";
  const luces = fase === "suspenso" ? "opacity-40" : fase === "revelado" && revelado ? (revelado.bien ? "opacity-100" : "opacity-60") : "opacity-80";
  return (
    <div
      className="sabio-escena pointer-events-auto relative flex h-full w-full flex-col overflow-hidden text-amber-50"
      style={{ paddingTop: "var(--tpl-st, 0px)", paddingBottom: "var(--tpl-sb, 0px)", paddingLeft: "var(--tpl-sl, 0px)", paddingRight: "var(--tpl-sr, 0px)" }}
      data-testid="sabio"
    >
      <style>{ESTILOS}</style>
      {/* el escenario: el estudio en 3D (o, si el equipo no puede, el fondo con sus luces) */}
      <EstudioSabio3D
        onListo={(e) => {
          estudio.current = e;
          setHay3d(!!e);
        }}
        foco={vertical ? (enJuego ? 0.24 : 0.3) : enJuego ? 0.36 : 0.42}
        concursante={null}
      />
      {!hay3d && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#3a2a7c_0%,#170f38_42%,#05030d_100%)]" />
          <div className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${luces}`}>
            <div className="sabio-foco sabio-foco-a" />
            <div className="sabio-foco sabio-foco-b" />
          </div>
          <Columnas />
        </>
      )}
      {fase === "revelado" && revelado?.bien && (
        <>
          <div className="sabio-destello pointer-events-none absolute inset-0" />
          <Chispas />
        </>
      )}
      {fase === "revelado" && revelado && !revelado.bien && revelado.elegida >= 0 && <div className="sabio-apagon pointer-events-none absolute inset-0 z-[5]" data-testid="sabio-apagon" />}
      {fase === "suspenso" && <div className="sabio-penumbra pointer-events-none absolute inset-0 z-[1]" />}

      {/* cabecera */}
      <div className="relative z-10 flex items-center justify-between gap-2 px-3 pt-2">
        <div className="min-w-0">
          <LogoSabio />
          <span className="sr-only" data-testid="sabio-titulo">{NOMBRE_CONCURSO}</span>
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

      <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto px-3 pb-3">
        {fase === "cargando" && (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-amber-300" />
          </div>
        )}
        {fase === "error" && <p className="mt-10 rounded-xl bg-red-950/60 p-4 text-center text-sm">{error}</p>}
        {fase === "portada" && estado && (
          <Portada
            estado={estado}
            onEmpezar={() => void empezar()}
            ocupado={ocupado}
            aviso={aviso}
            dice={dice}
            onMirar={mirar}
            onLlamadas={(si) => void cambiarLlamadas(si)}
            onDuelos={() => {
              city?.audio.click();
              setFase("duelos");
            }}
            onNoches={() => {
              city?.audio.click();
              setFase("noches");
            }}
            onMirarNoche={(id) => {
              city?.audio.click();
              setNocheId(id);
              setFase("noche-mirar");
            }}
            hay3d={hay3d}
          />
        )}
        {fase === "noches" && (
          <NocheEntrada
            onEntrar={(id) => {
              setNocheId(id);
              setFase("noche");
            }}
            onMirar={(id) => {
              setNocheId(id);
              setFase("noche-mirar");
            }}
            onVolver={() => void volverAPortada()}
          />
        )}
        {fase === "noche" && nocheId !== null && <NocheView id={nocheId} onSalir={() => void volverAPortada()} estudio={verEstudio} />}
        {fase === "noche-mirar" && nocheId !== null && <NocheView id={nocheId} mirar onSalir={() => void volverAPortada()} estudio={verEstudio} />}
        {fase === "duelos" && (
          <DuelosLobby
            onEntrar={(id) => {
              setDueloId(id);
              setFase("duelo");
            }}
            onVolver={() => void volverAPortada()}
          />
        )}
        {fase === "duelo" && dueloId !== null && <DueloView id={dueloId} onSalir={() => setFase("duelos")} onCambiar={(id) => setDueloId(id)} />}
        {fase === "mirando" && mirandoId !== null && <MirarView id={mirandoId} onSalir={() => void volverAPortada()} estudio={() => estudio.current} />}
        {(fase === "entre" || fase === "pregunta" || fase === "confirmar" || fase === "duda" || fase === "suspenso" || fase === "revelado") && partida && (
          <div className={`mx-auto flex w-full max-w-4xl gap-4 pt-2 ${hay3d ? "sabio-panel mt-auto rounded-t-3xl px-2 pb-1" : ""}`}>
            <div className="min-w-0 flex-1 space-y-2.5">
              <Presentador dice={dice} compacto={hay3d} />
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-x-1.5 text-[11px] font-bold uppercase tracking-widest text-amber-200/80" data-testid="sabio-grada">
                    <span>
                      Grada {n} de {GRADAS} · {canticoGrada(n)}
                    </span>
                    <span className="rounded-full px-1.5 py-px text-[9.5px] font-black tracking-wider text-black" style={{ background: dificultadGrada(n).color }} data-testid="sabio-dificultad">
                      {dificultadGrada(n).nombre}
                    </span>
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
                {q && (fase === "pregunta" || fase === "confirmar" || fase === "duda") && (
                  <div className="relative shrink-0" data-testid={congelado !== null ? "sabio-reloj-detenido" : undefined}>
                    <Reloj restan={congelado ?? restan} total={q.segundos} />
                    {congelado !== null && (
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-amber-950" title="Etán detuvo el reloj">
                        <Pause className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                )}
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
              {!hay3d && <MiniEscalera grada={partida.grada} />}
              {fase === "entre" && (
                <button type="button" className="sabio-boton w-full" onClick={() => void siguiente()} data-testid="sabio-seguir">
                  Subir a la grada {partida.grada + 1}
                </button>
              )}
              {q && (
                <>
                  <div className={`sabio-pregunta rounded-2xl text-center font-serif font-semibold leading-snug sm:text-lg ${hay3d ? "px-3 py-2.5 text-[15px]" : "px-4 py-3.5 text-[16px]"}`} data-testid="sabio-pregunta">
                    {q.texto}
                  </div>
                  <div className={`grid gap-2 ${hay3d ? "grid-cols-2" : "sm:grid-cols-2"}`}>
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
                          disabled={quitada || !!revelado || fase === "suspenso" || fase === "duda"}
                          onClick={() => elegir(i)}
                          className={`flex min-h-[44px] items-center gap-2 rounded-xl text-left font-semibold transition ${hay3d ? "px-2.5 py-1.5 text-[13px] leading-tight" : "px-3 py-2 text-[14px]"} ${clase} ${quitada ? "invisible" : ""}`}
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
                      <button type="button" className="rounded-xl bg-white/10 px-3 py-2.5 text-sm font-bold hover:bg-white/20" onClick={cambiar} data-testid="sabio-pensar">
                        Déjame pensar
                      </button>
                    </div>
                  )}
                  {fase === "suspenso" && (
                    <p className="sabio-latido text-center text-sm font-bold italic text-amber-200/90" data-testid="sabio-suspenso">
                      🥁 El pueblo contiene el aliento…
                    </p>
                  )}
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
              <Ico e={f.icono ?? ""} />
            </span>
          ))}
        </div>
      )}

      {fase === "duda" && q && elegida !== null && (
        <EscenaDuda frase={fraseDuda} letra={LETRAS[elegida]} opcion={q.opciones[elegida]} hay3d={hay3d} onConfirmar={() => void confirmar()} onCambiar={cambiar} />
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

// ================================================================ la escena de la duda y los efectos de la respuesta
/**
 * La escena de la duda: franjas de cine, el latido en la orilla de la pantalla y lo que dice Etán, grande. En 3D, la
 * cámara corta a los dos frente a frente y luego a Etán de cerca; sin 3D, su retrato. El reloj está detenido.
 */
function EscenaDuda({ frase, letra, opcion, hay3d, onConfirmar, onCambiar }: { frase: string | null; letra: string; opcion: string; hay3d: boolean; onConfirmar: () => void; onCambiar: () => void }) {
  return (
    <div className="sabio-duda pointer-events-auto absolute inset-0 z-30 flex flex-col justify-between" data-testid="sabio-duda" role="dialog" aria-label="Etán te pregunta si es tu respuesta final">
      <div className="sabio-franja h-[11vh] min-h-[44px] bg-black" />
      <div className="flex flex-1 flex-col items-center justify-end gap-3 px-4 pb-4 text-center">
        {!hay3d && (
          <div className="sabio-latido-lento">
            <Portrait who="etan" size={120} />
          </div>
        )}
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-300/90">Etán ezraíta</p>
        <p className={`max-w-xl font-serif text-[22px] font-black leading-tight text-amber-50 drop-shadow-[0_3px_12px_rgba(0,0,0,.9)] sm:text-[28px] ${frase ? "sabio-frase" : "opacity-0"}`} data-testid="sabio-duda-frase">
          {frase ?? "…"}
        </p>
        <p className="rounded-full bg-black/55 px-3 py-1 text-[12px] font-bold text-amber-100/90">
          Elegiste la {letra}: «{opcion}» · <Pause className="inline h-3 w-3" /> el reloj se detuvo
        </p>
      </div>
      <div className="sabio-franja grid min-h-[64px] grid-cols-2 items-center gap-2 bg-black px-3 py-2">
        <button type="button" className="sabio-boton" onClick={onConfirmar} data-testid="sabio-duda-si">
          Sí, es mi respuesta final
        </button>
        <button type="button" className="rounded-xl bg-white/10 px-3 py-2.5 text-sm font-bold hover:bg-white/20" onClick={onCambiar} data-testid="sabio-duda-cambiar">
          Cambiar
        </button>
      </div>
    </div>
  );
}

/** Los destellos dorados de la respuesta buena (también sin 3D). */
function Chispas() {
  const chispas = useRef(
    Array.from({ length: 22 }, (_, i) => ({
      x: 50 + Math.cos((i / 22) * Math.PI * 2) * (22 + Math.random() * 26),
      y: 42 + Math.sin((i / 22) * Math.PI * 2) * (16 + Math.random() * 22),
      d: Math.random() * 0.35,
      s: 6 + Math.random() * 9,
    })),
  );
  return (
    <div className="pointer-events-none absolute inset-0 z-[6] overflow-hidden" aria-hidden="true" data-testid="sabio-chispas">
      {chispas.current.map((c, i) => (
        <span
          key={i}
          className="sabio-chispa absolute rounded-full"
          style={{ left: `${c.x}%`, top: `${c.y}%`, width: c.s, height: c.s, animationDelay: `${c.d}s` }}
        />
      ))}
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
        const nivel = dificultadGrada(g);
        // el nombre del nivel va en la grada más alta de cada tramo de tres
        const tramo = nivel.hasta === g;
        return (
          <li
            key={g}
            className={`flex items-center justify-between gap-1 rounded-lg px-2 py-[3px] text-[12px] tabular-nums ${actual ? "bg-amber-400 font-black text-amber-950" : pasada ? "text-amber-200/60" : segura ? "font-black text-amber-200" : "text-amber-50/80"}`}
            style={{ boxShadow: `inset 3px 0 0 ${nivel.color}` }}
          >
            <span>
              {g} {pasada ? "✓" : ""}
            </span>
            {tramo && <span className="truncate text-[9px] font-black uppercase tracking-wider" style={{ color: actual ? "#3a2400" : nivel.color }}>{nivel.nombre}</span>}
            <span className="ml-auto">{miles(PUNTOS_GRADA[g])}</span>
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
        <p className="font-serif text-lg font-black text-amber-200"><Ico e="🤝" /> ¿A quién llamas?</p>
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
  onDuelos,
  onNoches,
  onMirarNoche,
  hay3d = false,
}: {
  estado: SabioEstado;
  onEmpezar: () => void;
  ocupado: boolean;
  aviso: string | null;
  dice: string;
  onMirar: (id: number) => void;
  onLlamadas: (si: boolean) => void;
  onDuelos: () => void;
  onNoches: () => void;
  onMirarNoche: (id: number) => void;
  /** Con el estudio en 3D detrás: la portada empieza más abajo para que se vea el escenario. */
  hay3d?: boolean;
}) {
  const [tab, setTab] = useState<"vivo" | "tablas" | "trajes" | "reglas">(estado.enVivo.length || estado.noches?.length ? "vivo" : "tablas");
  const [enVivo, setEnVivo] = useState<EnVivo[]>(estado.enVivo);
  const [noches, setNoches] = useState<NocheEnVivo[]>(estado.noches ?? []);
  const y = estado.yo;
  const quedan = Math.max(0, ENTRADAS_DIA - y.entradasHoy);
  // quién juega ahora: se refresca solo
  useEffect(() => {
    let parar = false;
    const t = setInterval(async () => {
      const r = await pedir<{ enVivo: EnVivo[]; noches?: NocheEnVivo[] }>("/en-vivo");
      if (!parar && r.ok && r.data?.enVivo) {
        setEnVivo(r.data.enVivo);
        setNoches(r.data.noches ?? []);
      }
    }, 10_000);
    return () => {
      parar = true;
      clearInterval(t);
    };
  }, []);
  const primero = enVivo[0];
  return (
    <div className={`mx-auto w-full max-w-2xl space-y-3 pt-2 ${hay3d ? "sabio-panel mt-[24vh] rounded-t-3xl px-2.5 pt-3" : ""}`} data-testid="sabio-portada">
      {estado.premioSemana && (
        <div className="rounded-2xl bg-gradient-to-r from-amber-300 to-amber-500 p-3 text-center text-sm font-black text-amber-950 shadow-lg" data-testid="sabio-premio-semana">
          <Ico e="🏆" /> Quedaste en el puesto {estado.premioSemana.puesto} de la semana pasada: +{estado.premioSemana.gozo} de gozo
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
      <Presentador dice={dice} compacto={hay3d} />
      <button type="button" className="sabio-boton w-full py-3.5 text-base" disabled={ocupado || quedan <= 0} onClick={onEmpezar} data-testid="sabio-empezar">
        {ocupado ? <Loader2 className="mx-auto h-5 w-5 animate-spin" /> : quedan > 0 ? "Subir al atril" : "Mañana hay más entradas"}
      </button>
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-800/80 to-indigo-800/80 py-3 text-sm font-black ring-1 ring-sky-300/50 hover:ring-sky-200"
        onClick={onDuelos}
        data-testid="sabio-duelos-abrir"
      >
        ⚔️ Duelo de sabios <span className="font-semibold text-sky-100/80">· con un amigo o con alguien que busque</span>
      </button>
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-900/85 to-violet-800/85 py-3 text-sm font-black ring-1 ring-violet-300/50 hover:ring-violet-200"
        onClick={onNoches}
        data-testid="sabio-noches-abrir"
      >
        <Moon className="h-4 w-4 text-amber-200" /> {NOMBRE_NOCHE}
        <span className="font-semibold text-violet-100/80">
          · de {NOCHE_MIN} a {NOCHE_MAX}, con tus amigos de la iglesia
        </span>
      </button>
      <p className="text-center text-[11px] text-amber-100/70" data-testid="sabio-entradas">
        Entradas de hoy: {quedan} de {ENTRADAS_DIA} · gozo de hoy {y.gozoHoy} de {GOZO_SABIO_DIA}
      </p>
      {aviso && <p className="rounded-xl bg-red-950/70 px-3 py-2 text-center text-xs">{aviso}</p>}
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
      {y.siguiente && <p className="text-center text-[11px] text-amber-100/70">Siguiente título: <Ico e={y.siguiente.icono ?? ""} /> {y.siguiente.nombre} — {y.siguiente.requisito.toLowerCase()}.</p>}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white/5 px-3 py-2 text-[11.5px]" data-testid="sabio-consejos">
        <span>
          <Ico e="🤝" /> Consejos dados: <b>{y.consejos}</b> · acertados: <b>{y.consejosBuenos}</b>
          {y.consejosBuenos < CONSEJOS_FAJA ? ` (faltan ${CONSEJOS_FAJA - y.consejosBuenos} para la faja del buen consejero)` : " · ¡ya tienes la faja!"}
        </span>
        <label className="flex cursor-pointer items-center gap-1.5 font-bold">
          <input type="checkbox" checked={y.llamadas} onChange={(e) => onLlamadas(e.target.checked)} className="h-4 w-4 accent-amber-400" data-testid="sabio-llamadas" />
          Recibir llamadas e invitaciones
        </label>
      </div>
      <div className="grid grid-cols-4 gap-0.5 rounded-full bg-black/30 p-1">
        {(
          [
            ["vivo", "En vivo", Eye],
            ["tablas", "Tablas", Trophy],
            ["trajes", "Trajes", Shirt],
            ["reglas", "Reglas", ScrollText],
          ] as const
        ).map(([id, nombre, Icono]) => (
          <button
            key={id}
            type="button"
            aria-pressed={tab === id}
            onClick={() => setTab(id)}
            className={`flex items-center justify-center gap-1 whitespace-nowrap rounded-full px-1 py-1.5 text-[11px] font-bold leading-none ${tab === id ? "bg-amber-400 text-amber-950" : "text-amber-100/80"}`}
            data-testid={`sabio-tab-${id}`}
          >
            <Icono className="h-3.5 w-3.5 shrink-0" /> {nombre}
          </button>
        ))}
      </div>
      {tab === "vivo" && <EnVivoLista enVivo={enVivo} noches={noches} onMirar={onMirar} onMirarNoche={onMirarNoche} />}
      {tab === "tablas" && <TablasPorPartida miPuestoSemana={estado.miPuestoSemana} />}
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

/**
 * Las tablas por partida (pedido de Luis): Hoy, La semana, Siempre y Mis partidas. Cada partida terminada con su puesto,
 * quién jugó, la grada en que quedó, los puntos, el tiempo, los comodines y cómo terminó. Mi fila resaltada, y mi puesto
 * aunque esté más abajo de los diez primeros.
 */
function TablasPorPartida({ miPuestoSemana }: { miPuestoSemana: number | null }) {
  const [de, setDe] = useState<TablaDe>("hoy");
  const [tablas, setTablas] = useState<Partial<Record<TablaDe, TablaVista>>>({});
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let vivo = true;
    setError(null);
    void pedir<TablaVista>(`/tablas?de=${de}`).then((r) => {
      if (!vivo) return;
      if (r.ok && r.data) setTablas((t) => ({ ...t, [de]: r.data! }));
      else setError(r.data?.message || "No se pudo traer la tabla. Revisa tu conexión.");
    });
    return () => {
      vivo = false;
    };
  }, [de]);
  const t = tablas[de];
  const info = TABLAS.find((x) => x.id === de)!;
  const vacia =
    de === "hoy" ? "Hoy nadie ha terminado una partida todavía. ¡Sube tú primero!" : de === "semana" ? "Esta semana nadie ha subido todavía." : de === "siempre" ? "Todavía no hay partidas en la tabla." : "Todavía no has jugado. ¡Sube al atril!";
  return (
    <div className="space-y-1.5" data-testid="sabio-tablas">
      <div className="grid grid-cols-4 gap-1">
        {TABLAS.map((x) => (
          <button
            key={x.id}
            type="button"
            aria-pressed={de === x.id}
            onClick={() => setDe(x.id)}
            className={`rounded-xl px-1 py-1.5 text-[11px] font-black leading-tight ${de === x.id ? "bg-white/90 text-[#1b1446]" : "bg-white/10 text-amber-100/85 hover:bg-white/20"}`}
            data-testid={`sabio-tabla-${x.id}`}
          >
            {x.nombre}
          </button>
        ))}
      </div>
      {error ? (
        <p className="rounded-xl bg-red-950/60 p-3 text-center text-xs">{error}</p>
      ) : !t ? (
        <div className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-amber-300" />
        </div>
      ) : t.filas.length === 0 ? (
        <p className="rounded-2xl bg-black/30 py-4 text-center text-xs text-amber-100/70" data-testid="sabio-tabla-vacia">
          {vacia}
        </p>
      ) : (
        <ol className="divide-y divide-white/10 overflow-hidden rounded-2xl bg-black/30" data-testid="sabio-tabla">
          {t.filas.map((f) => (
            <FilaDePartida key={f.id} f={f} mias={de === "mias"} />
          ))}
          {t.mia && (
            <>
              <li className="py-0.5 text-center text-[11px] font-black text-amber-200/60" aria-hidden="true">
                ⋯
              </li>
              <FilaDePartida f={t.mia} mias={false} />
            </>
          )}
        </ol>
      )}
      <p className="text-center text-[11px] text-amber-100/60" data-testid="sabio-tabla-nota">
        {info.nota}{" "}
        {t && de !== "mias" && t.total > 0 ? `${t.total} ${t.total === 1 ? "partida" : "partidas"}.` : ""}
        {t && de === "mias" && t.total > 0 ? `Jugaste ${t.total} ${t.total === 1 ? "partida" : "partidas"}.` : ""}
        {t?.miPuesto ? ` Tu mejor partida va en el puesto ${t.miPuesto}.` : ""}
        {de === "semana" ? ` Las tres personas con la mejor partida de la semana reciben ${PREMIO_SEMANA.join(", ")} de gozo el lunes (cuenta la mejor de cada una).${miPuestoSemana ? ` Vas en el puesto ${miPuestoSemana}.` : ""}` : ""}
      </p>
    </div>
  );
}

/** Una partida de la tabla: puesto (con medalla), quién, la grada en que quedó, el tiempo, los comodines y los puntos. */
function FilaDePartida({ f, mias }: { f: PartidaEnTabla; mias: boolean }) {
  const fecha = new Date(f.at);
  const cuando = mias ? fecha.toLocaleString("es", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "America/Chicago" }) : null;
  const medalla = !mias && f.puesto !== null && f.puesto <= 3 ? MEDALLAS[f.puesto - 1] : null;
  return (
    <li className={`flex items-center gap-2 px-2.5 py-1.5 text-[12.5px] ${f.esYo && !mias ? "bg-amber-400/20 ring-1 ring-inset ring-amber-300/50" : ""}`} data-testid={`sabio-fila-${f.id}`}>
      <span className="w-7 shrink-0 text-center font-black" title={mias && f.puesto ? `Puesto ${f.puesto} de su semana` : undefined}>
        {medalla ?? (mias ? (f.puesto ? `#${f.puesto}` : "–") : f.puesto)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1 truncate font-bold">
          <span aria-hidden="true">{ICONO_CAMINO[f.camino]}</span>
          <span className="truncate">
            {/* cada nombre abre «📜 Su registro» (RegistroUI.tsx) */}
            {mias ? cuando : <NombreConRegistro personajeId={f.pid} nombre={f.nombre} className="truncate" />}
            {f.esYo && !mias ? " (tú)" : ""}
          </span>
        </span>
        <span className="block truncate text-[10.5px] text-amber-200/75">
          {comoTermino(f.estado, f.grada)} · ⏱ {tiempoCorto(f.segundos)}
          {f.usados.length ? ` · ${f.usados.map((c) => COMODINES[c].icono).join("")}` : " · sin comodines"}
          {mias && f.puesto ? ` · puesto ${f.puesto} de su semana` : ""}
        </span>
      </span>
      <span className="w-[4.6rem] shrink-0 text-right font-black tabular-nums">{miles(f.puntos)}</span>
    </li>
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
      <p>• Quince gradas, una pregunta por grada, cada vez más difícil: fácil (1 a 3), media (4 a 6), difícil (7 a 9), muy difícil (10 a 12) y, en la cima, solo para expertos (13 a 15). Las gradas <b>5</b> y <b>10</b> son seguras: si fallas después, te quedas con ellas.</p>
      <p>• Tienes {segundosGrada(1)} segundos en las gradas 1 a 5, {segundosGrada(6)} en la 6 a la 10 y {segundosGrada(11)} en las últimas. Puedes retirarte con lo ganado antes de responder.</p>
      <p>• Antes de corregir, el presentador te pregunta si es tu última palabra. Al confirmar, las luces bajan, cae el foco sobre tu atril y suena el redoble: el suspenso crece con la grada.</p>
      <p>
        • A veces Etán te mira a los ojos y te hace dudar: cada 2 o 3 preguntas, siempre en las gradas seguras y desde la 11, y cuando ya usaste más de la mitad del reloj. Pasa igual si tu respuesta es buena o mala (ni él la sabe), y mientras habla el reloj se detiene: no pierdes ni un segundo.
      </p>
      <div className="space-y-1.5">
        {ORDEN_COMODINES.map((c) => (
          <p key={c}>
            <Ico e={COMODINES[c].icono ?? ""} /> <b>{COMODINES[c].nombre}:</b> {COMODINES[c].texto} <span className="italic text-amber-200/80">«{COMODINES[c].verso.text}» {COMODINES[c].verso.ref}</span>
          </p>
        ))}
      </div>
      <p>
        • Con «Un amigo» llamas de verdad a un amigo o vecino que esté en la ciudad: le llega tu pregunta y tiene {LLAMADA_S} segundos. Si acierta, gana {GOZO_CONSEJO} de gozo; con {CONSEJOS_FAJA} consejos acertados gana la faja azul del buen consejero. <span className="italic text-amber-200/80">«{VERSO_CONSEJO.text}» {VERSO_CONSEJO.ref}</span>
      </p>
      <p>
        • El público: en «En vivo» miras las partidas que se juegan ahora y animas con 👏 🙏 🔥 (quien juega lo ve). <span className="italic text-amber-200/80">«{VERSO_PUBLICO.text}» {VERSO_PUBLICO.ref}</span>
      </p>
      <p>
        • ⚔️ El duelo de sabios: reta a un amigo o vecino en línea (o busca a alguien). Los dos responden a la vez las mismas {DUELO_RONDAS} preguntas; acertar rápido vale más. Con {DUELOS_MANTO} duelos ganados, el manto azul de los vencedores.
      </p>
      <p>
        • 🌙 {NOMBRE_NOCHE}: abre una sala con su código de seis letras e invita a tus vecinos y amigos (de {NOCHE_MIN} a {NOCHE_MAX}). Todos responden a la vez las mismas 12 preguntas, con la tabla en vivo después de cada una y el podio al final.
      </p>
      <p>• {ENTRADAS_DIA} entradas por día (las siete columnas). Las preguntas no se te repiten hasta que veas todas las de esa grada.</p>
      <p>• Ganas puntos de sabiduría, gozo (hasta {GOZO_SABIO_DIA} por día), títulos ({TITULOS.map((t) => t.nombre).join(", ")}) y los trajes de los sabios.</p>
    </div>
  );
}

// ================================================================ el público
function EnVivoLista({ enVivo, noches, onMirar, onMirarNoche }: { enVivo: EnVivo[]; noches: NocheEnVivo[]; onMirar: (id: number) => void; onMirarNoche: (id: number) => void }) {
  return (
    <div className="space-y-1.5" data-testid="sabio-envivo">
      {noches.length > 0 && (
        <ul className="divide-y divide-white/10 rounded-2xl bg-indigo-950/50 ring-1 ring-indigo-300/30" data-testid="sabio-envivo-noches">
          {noches.map((n) => (
            <li key={n.id} className="flex items-center gap-2 px-3 py-2 text-[13px]">
              <Moon className="h-4 w-4 shrink-0 text-amber-200" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-bold">La noche de {n.anfitrion}</span>
                <span className="block truncate text-[11px] text-amber-200/70">
                  {n.jugadores} personas · pregunta {Math.max(1, n.ronda)} de {n.total}
                  {n.primero ? ` · primer puesto: ${n.primero}` : ""}
                </span>
              </span>
              {n.mirando > 0 && (
                <span className="flex items-center gap-0.5 text-[11px] text-amber-100/70">
                  <Eye className="h-3 w-3" /> {n.mirando}
                </span>
              )}
              <button type="button" className="rounded-full bg-amber-400 px-3 py-1 text-[11px] font-black text-amber-950" onClick={() => onMirarNoche(n.id)} data-testid={`sabio-mirar-noche-${n.id}`}>
                Mirar
              </button>
            </li>
          ))}
        </ul>
      )}
      {enVivo.length === 0 ? (
        noches.length ? null : (
          <p className="rounded-2xl bg-black/30 py-4 text-center text-xs text-amber-100/70">Ahora no hay nadie en el atril. Cuando alguien juegue, aquí lo puedes mirar en vivo y animarlo.</p>
        )
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
function MirarView({ id, onSalir, estudio }: { id: number; onSalir: () => void; estudio: () => EstudioSabio | null }) {
  const [v, setV] = useState<MirarVista | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [restan, setRestan] = useState(0);
  const [espera, setEspera] = useState(false);
  const [flotan, setFlotan] = useState<Flota[]>([]);
  const finTiempo = useRef(0);
  const ultimaVista = useRef<number | null>(null);
  const ultimoPublico = useRef<PublicoVista | null>(null);
  const claveEstudio = useRef("");

  // en el estudio se sienta quien juega (con la vestidura de su camino) y se ve lo mismo que en su pantalla
  useEffect(() => () => estudio()?.setConcursante(null), [estudio]);
  function moverEstudio(d: MirarVista) {
    const e = estudio();
    if (!e) return;
    e.setConcursante(d.camino === "profecia" ? "profeta" : d.camino === "realeza" ? "oficial" : "sacerdote");
    e.setMirando(d.publico.nombres ?? []);
    const u = d.ultima;
    const reciente = u && Date.now() - u.at < 9000;
    const clave = d.estado !== "jugando" ? `fin-${d.estado}` : reciente ? `u-${u!.at}` : d.pregunta ? `p-${d.pregunta.texto}-${d.pregunta.quitadas.join()}` : `e-${d.grada}`;
    if (d.llamada) e.mostrarLlamada(d.llamada.nombre, d.llamada.restantes);
    if (clave === claveEstudio.current) return;
    claveEstudio.current = clave;
    if (d.estado !== "jugando") {
      e.setFase(d.estado === "gano" ? "gano" : "fin", { grada: d.grada });
      e.mostrarMensaje(d.estado === "gano" ? "¡Sabio de las quince gradas!" : `${miles(d.puntos)} puntos`, d.nombre);
    } else if (reciente && u) {
      const segura = u.bien && (GRADAS_SEGURAS as readonly number[]).includes(d.grada);
      e.setFase(u.bien ? (segura ? "segura" : "bien") : "mal", { grada: d.grada });
      e.mostrarPregunta({ n: u.n, texto: u.texto, opciones: u.opciones, quitadas: [], correcta: u.opciones.indexOf(u.correcta), mala: u.bien || !u.elegida ? null : u.opciones.indexOf(u.elegida) });
    } else if (d.pregunta) {
      e.setFase("pregunta", { grada: d.grada });
      if (d.ancianos) e.mostrarAncianos(d.ancianos, d.pregunta.quitadas);
      else if (!d.llamada) e.mostrarPregunta({ n: d.pregunta.n, texto: d.pregunta.texto, opciones: d.pregunta.opciones, quitadas: d.pregunta.quitadas });
    } else {
      e.setFase("entre", { grada: d.grada });
      e.mostrarGrada(d.grada + 1);
    }
  }

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
        for (const n of nuevos.slice(0, 3)) estudio()?.aplauso(n.tipo);
      }
      moverEstudio(d);
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
    const mio: Flota = { id: ++flotaId, icono, x: 10 + Math.random() * 80, tipo };
    estudio()?.aplauso(tipo);
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
              <span className="text-xl leading-none"><Ico e={a.icono ?? ""} /></span>
              {a.texto}
            </button>
          ))}
        </div>
      ) : (
        <p className="rounded-xl bg-amber-400/15 p-3 text-center text-sm font-black" data-testid="sabio-mirar-fin">
          🏁 Terminó la partida de {v.nombre}. {v.estado === "gano" ? "¡Subió hasta arriba!" : "¡Gracias por animar!"}
        </p>
      )}
      <button type="button" className="w-full rounded-xl bg-white/10 py-2.5 text-sm font-bold hover:bg-white/20" onClick={onSalir} data-testid="sabio-mirar-salir">
        {termino ? "Volver a la casa de la sabiduría" : "Dejar de mirar"}
      </button>
      {flotan.length > 0 && (
        <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
          {flotan.map((f) => (
            <span key={f.id} className="sabio-flota absolute bottom-16 text-3xl" style={{ left: `${f.x}%` }}>
              <Ico e={f.icono ?? ""} />
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
        <p className="mt-1 text-sm font-bold"><Ico e="✨" /> +{fin.gozo} de gozo{fin.topeGozo ? " (llegaste al tope de hoy)" : ""}</p>
      </div>
      {fin.correcta && !gano && (
        <p className="rounded-xl bg-white/5 p-2.5 text-[12.5px]">
          La respuesta era <b>{fin.correcta}</b>. {fin.explica} <span className="text-amber-300">({fin.ref})</span>
        </p>
      )}
      {fin.tituloNuevo && fin.titulo && (
        <p className="rounded-xl bg-amber-400/20 p-2.5 text-sm font-black" data-testid="sabio-fin-titulo">
          Nuevo título: <Ico e={fin.titulo.icono ?? ""} /> {fin.titulo.nombre}
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
.sabio-panel{background:linear-gradient(180deg,rgba(6,4,18,.15) 0%,rgba(6,4,18,.82) 14%,rgba(6,4,18,.94) 100%);box-shadow:0 -18px 40px rgba(6,4,18,.55);backdrop-filter:blur(2px)}
.sabio-barra{animation:sabioBarra .8s ease-out}
@keyframes sabioBarra{from{transform:scaleY(0);transform-origin:bottom}to{transform:scaleY(1);transform-origin:bottom}}
.sabio-flota{animation:sabioFlota 2.3s ease-out forwards;filter:drop-shadow(0 4px 10px rgba(0,0,0,.5))}
@keyframes sabioFlota{0%{transform:translateY(0) scale(.6);opacity:0}15%{opacity:1;transform:translateY(-20px) scale(1.1)}100%{transform:translateY(-260px) scale(1);opacity:0}}
.sabio-duda{background:radial-gradient(ellipse at 50% 42%,transparent 34%,rgba(0,0,0,.5) 72%,rgba(0,0,0,.85) 100%);animation:sabioDudaLatido .83s ease-in-out infinite}
@keyframes sabioDudaLatido{0%,100%{box-shadow:inset 0 0 0 rgba(170,24,24,0)}8%{box-shadow:inset 0 0 95px rgba(170,24,24,.55)}20%{box-shadow:inset 0 0 30px rgba(170,24,24,.15)}29%{box-shadow:inset 0 0 70px rgba(170,24,24,.42)}}
.sabio-franja{animation:sabioFranja .45s cubic-bezier(.2,.8,.2,1) both}
.sabio-duda>.sabio-franja:first-child{transform-origin:top}
.sabio-duda>.sabio-franja:last-child{transform-origin:bottom}
@keyframes sabioFranja{from{transform:scaleY(0)}to{transform:scaleY(1)}}
.sabio-frase{animation:sabioFrase .6s ease-out both}
@keyframes sabioFrase{from{opacity:0;transform:translateY(10px);filter:blur(4px)}to{opacity:1;transform:none;filter:none}}
.sabio-latido-lento{animation:sabioLatido .83s ease-in-out infinite}
.sabio-penumbra{background:radial-gradient(ellipse at 62% 38%,rgba(255,240,200,.07) 0%,rgba(0,0,0,.32) 42%,rgba(0,0,0,.66) 100%);animation:sabioPenumbra .5s ease-out both}
@keyframes sabioPenumbra{from{opacity:0}to{opacity:1}}
.sabio-apagon{animation:sabioApagon 2.7s ease-in-out both}
@keyframes sabioApagon{0%{background:rgba(255,40,40,.38)}6%{background:rgba(255,40,40,.22)}12%{background:rgba(0,0,0,.93)}44%{background:rgba(0,0,0,.9)}100%{background:rgba(90,0,0,.18)}}
.sabio-chispa{background:radial-gradient(circle,#fffbe6 0%,#ffd36a 42%,rgba(243,201,90,0) 72%);animation:sabioChispa 1.7s ease-out both}
@keyframes sabioChispa{0%{transform:scale(0);opacity:0}18%{transform:scale(1.5);opacity:1}60%{opacity:.9}100%{transform:scale(.3) translateY(-34px);opacity:0}}
.sabio-sube{animation:sabioSube .6s ease-out}
.sabio-baja{animation:sabioBaja .6s ease-out}
@keyframes sabioSube{from{transform:translateY(6px);opacity:0}to{transform:none;opacity:1}}
@keyframes sabioBaja{from{transform:translateY(-6px);opacity:0}to{transform:none;opacity:1}}
@media (prefers-reduced-motion: reduce){.sabio-foco,.sabio-op-elegida,.sabio-op-bien,.sabio-latido,.sabio-destello,.sabio-barra,.sabio-flota,.sabio-duda,.sabio-franja,.sabio-frase,.sabio-latido-lento,.sabio-chispa,.sabio-apagon{animation:none!important}}
`;

