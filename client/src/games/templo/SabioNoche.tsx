/**
 * «La noche de los sabios» (shared/sabio-noche.ts, server/sabio-noche.ts), dentro de la casa de la sabiduría: la entrada
 * (abrir una sala o entrar con un código), la sala (el código, quiénes están, a quién invitar y «Empezar»), la noche
 * (la pregunta con su reloj, quiénes ya respondieron, la respuesta con su cita y la tabla en vivo con los puestos que
 * suben y bajan) y el podio. Se pregunta al servidor cada segundo y la red de la ciudad avisa los cambios; aquí nunca
 * está la respuesta antes de tiempo.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Copy, Crown, Eye, Loader2, LogIn, Moon, UserPlus, X } from "lucide-react";
import {
  NOCHE_MAX, NOCHE_MIN, NOCHE_PREGUNTAS, NOCHE_REVELAR_S, NOCHE_SEGUNDOS, NOCHES_DIA, NOCHE_GOZO, NOCHE_GOZO_RESTO, NOMBRE_NOCHE, VERSO_NOCHE, VERSO_SALA, LARGO_CODIGO,
  limpiarCodigo,
  type InvitablesNoche, type InvitacionNoche, type NocheJugadorVista, type NocheVista,
} from "@shared/sabio-noche";
import { GOZO_SABIO_DIA, MEDALLAS } from "@shared/sabio";
import type { Camino } from "@shared/caminos";
import { ICONO_CAMINO } from "./barrio-chat";
import { LETRAS, Presentador, RELACION, Reloj, miles, pedir } from "./sabio-comun";
import { sabioRed } from "./sabio-red";
import { sonido } from "./sabio-sonido";
import type { EstudioSabio } from "./estudio/estudio-sabio";
import type { FigureLook } from "./three/characters";

const lookDe = (c: Camino): FigureLook => (c === "profecia" ? "profeta" : c === "realeza" ? "oficial" : "sacerdote");
type Entrada = { noche: NocheVista | null; invitaciones: InvitacionNoche[]; hoy: number; jugadas: number; ganadas: number };

// ================================================================ la entrada: abrir una sala o entrar con un código
export function NocheEntrada({ onEntrar, onMirar, onVolver }: { onEntrar: (id: number) => void; onMirar: (id: number) => void; onVolver: () => void }) {
  const [e, setE] = useState<Entrada | null>(null);
  const [codigo, setCodigo] = useState("");
  const [aviso, setAviso] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState(false);
  const [enVivo, setEnVivo] = useState<import("@shared/sabio-noche").NocheEnVivo[]>([]);
  const entrar = useRef(onEntrar);
  entrar.current = onEntrar;

  const cargar = useCallback(async () => {
    const r = await pedir<Entrada>("/noche");
    if (r.ok && r.data) {
      if (r.data.noche) return entrar.current(r.data.noche.id);
      setE(r.data);
    } else setAviso(r.data?.message || "No se pudo abrir la noche de los sabios. Revisa tu conexión.");
    const v = await pedir<{ noches?: import("@shared/sabio-noche").NocheEnVivo[] }>("/en-vivo");
    if (v.ok && v.data?.noches) setEnVivo(v.data.noches);
  }, []);
  useEffect(() => {
    void cargar();
    const t = setInterval(() => void cargar(), 8000);
    return () => clearInterval(t);
  }, [cargar]);

  async function abrir() {
    setOcupado(true);
    setAviso(null);
    const r = await pedir<{ noche: NocheVista }>("/noche/abrir", {});
    setOcupado(false);
    if (r.ok && r.data?.noche) {
      sonido.entrada();
      onEntrar(r.data.noche.id);
    } else setAviso(r.data?.message || "No se pudo abrir la sala.");
  }

  async function unirse(c = codigo) {
    const limpio = limpiarCodigo(c);
    if (limpio.length !== LARGO_CODIGO) {
      setAviso(`El código tiene ${LARGO_CODIGO} letras.`);
      return;
    }
    setOcupado(true);
    setAviso(null);
    const r = await pedir<{ noche: NocheVista }>("/noche/unirse", { codigo: limpio });
    setOcupado(false);
    if (r.ok && r.data?.noche) onEntrar(r.data.noche.id);
    else setAviso(r.data?.message || "No se pudo entrar a la sala.");
  }

  const quedan = e ? Math.max(0, NOCHES_DIA - e.hoy) : 0;
  return (
    <div className="sabio-panel mx-auto mt-[18vh] w-full max-w-2xl space-y-3 rounded-t-3xl px-2.5 pt-3" data-testid="noche-entrada">
      <p className="sabio-titulo flex items-center justify-center gap-2 text-center font-serif text-2xl font-black">
        <Moon className="h-6 w-6 text-amber-200" /> {NOMBRE_NOCHE}
      </p>
      <Presentador
        dice={`Esta noche no sube una sola persona: suben todas. De ${NOCHE_MIN} a ${NOCHE_MAX}, las mismas ${NOCHE_PREGUNTAS} preguntas a la vez, y gana quien sepa más… y más rápido.`}
        compacto
      />
      {!e ? (
        <div className="flex justify-center py-6">
          <Loader2 className="h-7 w-7 animate-spin text-amber-300" />
        </div>
      ) : (
        <>
          {e.invitaciones.length > 0 && (
            <div className="space-y-1.5" data-testid="noche-invitaciones">
              {e.invitaciones.map((i) => (
                <button
                  key={i.id}
                  type="button"
                  disabled={ocupado || quedan <= 0}
                  onClick={() => void unirse(i.codigo)}
                  className="flex w-full items-center gap-2 rounded-2xl bg-indigo-900/60 p-2.5 text-left ring-1 ring-indigo-300/50 hover:bg-indigo-900/80"
                  data-testid={`noche-invitacion-${i.id}`}
                >
                  <span className="text-lg" aria-hidden="true">{ICONO_CAMINO[i.camino]}</span>
                  <span className="min-w-0 flex-1 text-[12.5px]">
                    <b>{i.de}</b> te invitó a su sala ({i.jugadores} {i.jugadores === 1 ? "persona" : "personas"})
                  </span>
                  <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-black text-amber-950">Entrar</span>
                </button>
              ))}
            </div>
          )}
          <button type="button" className="sabio-boton flex w-full items-center justify-center gap-2 py-3" disabled={ocupado || quedan <= 0} onClick={() => void abrir()} data-testid="noche-abrir">
            <Crown className="h-4 w-4" /> {quedan > 0 ? "Abrir una sala e invitar" : "Mañana hay más noches"}
          </button>
          <div className="rounded-2xl bg-black/30 p-2.5">
            <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-200/80">¿Te pasaron un código?</p>
            <div className="flex gap-2">
              <input
                value={codigo}
                onChange={(x) => setCodigo(limpiarCodigo(x.target.value).slice(0, LARGO_CODIGO))}
                onKeyDown={(x) => x.key === "Enter" && void unirse()}
                placeholder="ABCDEF"
                inputMode="text"
                autoCapitalize="characters"
                autoComplete="off"
                aria-label={`El código de ${LARGO_CODIGO} letras`}
                className="min-w-0 flex-1 rounded-xl border border-amber-300/50 bg-[#120c2e] px-3 py-2 text-center font-mono text-lg font-black uppercase tracking-[0.35em] text-amber-100 placeholder:text-amber-100/25 focus:outline-none focus:ring-2 focus:ring-amber-300"
                data-testid="noche-codigo"
              />
              <button type="button" className="sabio-boton flex items-center gap-1.5 px-4" disabled={ocupado || codigo.length !== LARGO_CODIGO || quedan <= 0} onClick={() => void unirse()} data-testid="noche-unirse">
                <LogIn className="h-4 w-4" /> Entrar
              </button>
            </div>
          </div>
          {aviso && <p className="rounded-xl bg-red-950/70 px-3 py-2 text-center text-xs" data-testid="noche-aviso">{aviso}</p>}
          <p className="text-center text-[11px] text-amber-100/70" data-testid="noche-hoy">
            Noches de hoy: {e.hoy} de {NOCHES_DIA} · jugadas {e.jugadas} · ganadas {e.ganadas}
          </p>
          {enVivo.length > 0 && (
            <div className="space-y-1.5" data-testid="noche-en-vivo">
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-200/80">Noches en vivo</p>
              {enVivo.map((n) => (
                <button key={n.id} type="button" onClick={() => onMirar(n.id)} className="flex w-full items-center gap-2 rounded-xl bg-black/30 p-2 text-left hover:bg-black/50" data-testid={`noche-mirar-${n.id}`}>
                  <span className="sabio-latido h-2.5 w-2.5 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                  <span className="min-w-0 flex-1 text-[12px]">
                    La noche de <b>{n.anfitrion}</b>: {n.jugadores} personas, pregunta {Math.max(1, n.ronda)} de {n.total}
                    {n.primero ? ` · ${n.primero} va en el primer puesto` : ""}
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[11px] font-black">
                    <Eye className="h-3.5 w-3.5" /> Mirar
                  </span>
                </button>
              ))}
            </div>
          )}
          <ReglasNoche />
        </>
      )}
      <p className="text-center font-serif text-[12px] italic text-amber-100/70">
        «{VERSO_NOCHE.text}» <span className="not-italic font-semibold text-amber-300">{VERSO_NOCHE.ref}</span>
      </p>
      <button type="button" className="w-full rounded-xl bg-white/10 py-2.5 text-sm font-bold hover:bg-white/20" onClick={onVolver} data-testid="noche-volver">
        Volver a la casa de la sabiduría
      </button>
    </div>
  );
}

function ReglasNoche() {
  return (
    <div className="space-y-1 rounded-2xl bg-black/30 p-3 text-[12px] leading-snug" data-testid="noche-reglas">
      <p>• Quien abre la sala recibe un código de {LARGO_CODIGO} letras: compártelo, o invita desde aquí a tus vecinos y amigos que estén en la ciudad. Son de {NOCHE_MIN} a {NOCHE_MAX} personas, y quien abrió la sala la empieza.</p>
      <p>• {NOCHE_PREGUNTAS} preguntas, de la grada 1 a la {NOCHE_PREGUNTAS}, iguales para todos y a la vez. Tienes {NOCHE_SEGUNDOS} segundos en cada una.</p>
      <p>• Si aciertas: 100 puntos y hasta 100 más por la rapidez. Después de cada pregunta, la tabla en vivo: mira cómo suben y bajan los puestos.</p>
      <p>
        • Al final, el podio. Gozo: {NOCHE_GOZO.join(", ")} para los tres primeros y {NOCHE_GOZO_RESTO} para los demás (dentro del tope de {GOZO_SABIO_DIA} por día del concurso), si respondiste al menos la mitad. Cada noche suma para la copa de tu barrio. {NOCHES_DIA} noches por día.
      </p>
    </div>
  );
}

// ================================================================ la noche (la sala, las preguntas, la tabla y el podio)
const TERMINADA = new Set(["terminada", "cancelada"]);

export function NocheView({ id, onSalir, estudio, mirar = false }: { id: number; onSalir: () => void; estudio: () => EstudioSabio | null; mirar?: boolean }) {
  const [n, setN] = useState<NocheVista | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [restan, setRestan] = useState(0);
  const [espera, setEspera] = useState(0);
  const [enviando, setEnviando] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const [salir, setSalir] = useState(false);
  const [invitar, setInvitar] = useState(false);
  const finPregunta = useRef(0);
  const finEspera = useRef(0);
  const clave = useRef("");
  const termino = useRef(false);
  const ultimoTic = useRef(-1);
  const claveEstudio = useRef("");

  /** El estudio sigue la noche: la sala, la pregunta, la respuesta y el podio. */
  const moverEstudio = useCallback(
    (x: NocheVista) => {
      const e = estudio();
      if (!e) return;
      const k =
        x.estado === "terminada"
          ? "fin"
          : x.revelado
            ? `r${x.revelado.n}`
            : x.pregunta
              ? `p${x.pregunta.n}-${x.miRespuesta ?? ""}`
              : `${x.estado}-${x.ronda}-${x.jugadores.length}-${x.anfitrion}`;
      if (k === claveEstudio.current) return;
      claveEstudio.current = k;
      if (x.estado === "terminada") {
        if (x.fin?.podio.length) e.mostrarPodio(x.fin.podio.map((p) => ({ nombre: p.nombre, look: lookDe(p.camino), puesto: p.puesto })));
        else e.setFase("fin", { grada: NOCHE_PREGUNTAS });
        return;
      }
      if (x.estado === "sala" || x.estado === "cancelada") {
        e.setFase("portada", { grada: 0 });
        e.mostrarMensaje(NOMBRE_NOCHE, x.estado === "sala" ? `${x.jugadores.length} de ${NOCHE_MAX} · esperando a ${x.anfitrion}` : "La sala se cerró");
        return;
      }
      const titulo = `LA NOCHE DE LOS SABIOS  ·  PREGUNTA ${Math.max(1, x.ronda)} DE ${NOCHE_PREGUNTAS}`;
      if (x.revelado) {
        const r = x.revelado;
        const jugue = x.juego && r.mia !== null;
        e.setFase(jugue ? (r.mia === r.correcta ? "bien" : "mal") : "entre", { grada: r.n });
        e.mostrarPregunta({ n: r.n, titulo, texto: r.texto, opciones: r.opciones, quitadas: [], correcta: r.opciones.indexOf(r.correcta), mala: jugue && r.mia !== r.correcta ? r.opciones.indexOf(r.mia!) : null });
      } else if (x.pregunta) {
        e.setFase(x.miRespuesta ? "confirmar" : "pregunta", { grada: x.pregunta.n - 1 });
        e.mostrarPregunta({ n: x.pregunta.n, titulo, texto: x.pregunta.texto, opciones: x.pregunta.opciones, quitadas: [], elegida: x.miRespuesta ? x.pregunta.opciones.indexOf(x.miRespuesta) : null });
      } else {
        e.setFase("entre", { grada: Math.max(0, x.ronda - 1) });
        e.mostrarMensaje(`Pregunta ${Math.max(1, x.ronda)}`, "¡Prepárense!");
      }
    },
    [estudio],
  );

  const aplicar = useCallback(
    (x: NocheVista) => {
      setN(x);
      termino.current = TERMINADA.has(x.estado);
      if (x.pregunta) finPregunta.current = Date.now() + x.pregunta.restantes * 1000;
      finEspera.current = Date.now() + x.espera * 1000;
      // los sonidos: la primera pregunta, cada respuesta revelada (si acerté o no) y el final
      const k = x.revelado ? `r${x.revelado.n}` : x.pregunta ? `p${x.pregunta.n}` : x.estado;
      if (k !== clave.current) {
        if (clave.current !== "") {
          if (x.revelado && k.startsWith("r")) {
            sonido.golpe();
            if (x.juego && x.revelado.mia !== null) {
              if (x.revelado.mia === x.revelado.correcta) {
                sonido.bien();
                sonido.destellos();
              } else sonido.mal();
            }
          } else if (k === "p1") sonido.entrada();
          else if (k === "terminada") {
            if (x.fin?.puesto === 1) sonido.ganar();
            else sonido.ovacion(4, 1.3);
          }
        }
        clave.current = k;
      }
      moverEstudio(x);
    },
    [moverEstudio],
  );

  const traer = useCallback(async () => {
    const r = await pedir<{ noche: NocheVista }>(mirar ? `/noche-mirar/${id}` : `/noche/${id}`);
    if (!r.ok || !r.data?.noche) {
      if (r.status === 404 || r.status === 400) setError(r.data?.message || "Esa noche ya no está.");
      return;
    }
    aplicar(r.data.noche);
  }, [id, mirar, aplicar]);

  useEffect(() => {
    clave.current = "";
    claveEstudio.current = "";
    termino.current = false;
    setN(null);
    setError(null);
    void traer();
    // cada 2 s de respaldo; los avisos de la red se juntan (así un grupo con la misma wifi no gasta el límite de peticiones)
    const t = setInterval(() => {
      if (!termino.current) void traer();
    }, mirar ? 2500 : 2000);
    let juntar: number | null = null;
    const quitarAviso = sabioRed.onNoche((x) => {
      if (x !== id || juntar !== null) return;
      juntar = window.setTimeout(() => {
        juntar = null;
        void traer();
      }, 400);
    });
    const quitar = () => {
      quitarAviso();
      if (juntar !== null) clearTimeout(juntar);
    };
    const reloj = setInterval(() => {
      const s = Math.max(0, Math.ceil((finPregunta.current - Date.now()) / 1000));
      if (s !== ultimoTic.current && s > 0 && s <= 5 && !termino.current) sonido.tic(true);
      ultimoTic.current = s;
      setRestan(s);
      setEspera(Math.max(0, Math.ceil((finEspera.current - Date.now()) / 1000)));
    }, 250);
    return () => {
      clearInterval(t);
      clearInterval(reloj);
      quitar();
    };
  }, [id, mirar, traer]);

  async function responder(o: string) {
    if (!n?.pregunta || n.miRespuesta || enviando || mirar) return;
    setEnviando(true);
    setAviso(null);
    sonido.fijar();
    setN({ ...n, miRespuesta: o });
    const r = await pedir<{ noche: NocheVista | null }>(`/noche/${id}/responder`, { opcion: o });
    setEnviando(false);
    if (r.data?.noche) aplicar(r.data.noche);
    if (!r.ok) setAviso(r.data?.message || "No se pudo mandar la respuesta.");
  }

  async function empezar() {
    setEnviando(true);
    setAviso(null);
    const r = await pedir<{ noche: NocheVista }>(`/noche/${id}/empezar`, {});
    setEnviando(false);
    if (r.ok && r.data?.noche) aplicar(r.data.noche);
    else setAviso(r.data?.message || "No se pudo empezar la noche.");
  }

  async function dejar() {
    setSalir(false);
    if (mirar) return onSalir();
    const r = await pedir<{ noche: NocheVista }>(`/noche/${id}/salir`, {});
    if (r.data?.noche?.estado === "terminada") aplicar(r.data.noche);
    else onSalir();
  }

  async function quitar(pid: number, bot = false) {
    const r = await pedir<{ noche: NocheVista }>(bot ? `/noche/${id}/bot` : `/noche/${id}/quitar`, bot ? { quitar: pid } : { a: pid });
    if (r.ok && r.data?.noche) aplicar(r.data.noche);
    else setAviso(r.data?.message || "No se pudo.");
  }

  /** Quien abrió la sala agrega un compañero de la computadora (para jugar solo o completar la noche). */
  async function agregarBot(nivel: "facil" | "normal" | "dificil") {
    setEnviando(true);
    setAviso(null);
    const r = await pedir<{ noche: NocheVista }>(`/noche/${id}/bot`, { nivel });
    setEnviando(false);
    if (r.ok && r.data?.noche) aplicar(r.data.noche);
    else setAviso(r.data?.message || "No se pudo agregar el compañero.");
  }

  if (error)
    return (
      <div className="sabio-panel mx-auto mt-[24vh] max-w-md space-y-3 rounded-t-3xl px-3 pt-6 text-center" data-testid="noche">
        <p className="rounded-xl bg-white/5 p-4 text-sm" data-testid="noche-error">{error}</p>
        <button type="button" className="sabio-boton w-full" onClick={onSalir} data-testid="noche-volver">
          Volver
        </button>
      </div>
    );
  if (!n)
    return (
      <div className="flex h-full items-center justify-center" data-testid="noche">
        <Loader2 className="h-8 w-8 animate-spin text-amber-300" />
      </div>
    );

  // ---------------------------------------------------------------- la sala
  if (n.estado === "sala" || n.estado === "cancelada")
    return (
      <div className="sabio-panel mx-auto mt-[14vh] w-full max-w-2xl space-y-3 rounded-t-3xl px-2.5 pt-3" data-testid="noche">
        <p className="sabio-titulo flex items-center justify-center gap-2 text-center font-serif text-2xl font-black">
          <Moon className="h-6 w-6 text-amber-200" /> {NOMBRE_NOCHE}
        </p>
        {n.estado === "cancelada" ? (
          <p className="rounded-xl bg-white/5 p-4 text-center text-sm" data-testid="noche-cancelada">La sala se cerró sin empezar.</p>
        ) : (
          <>
            {n.codigo && <CodigoSala codigo={n.codigo} />}
            <Presentador
              dice={
                n.jugadores.length < NOCHE_MIN
                  ? `Faltan ${NOCHE_MIN - n.jugadores.length} para empezar. ¡Invita a tus vecinos y amigos!`
                  : n.soyAnfitrion
                    ? `Ya son ${n.jugadores.length}. Cuando quieras, empieza la noche.`
                    : `Ya son ${n.jugadores.length}. Esperando a que ${n.anfitrion} empiece la noche…`
              }
              compacto
            />
            <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-3" data-testid="noche-sala">
              {n.jugadores.map((j) => (
                <li key={j.pid} className={`flex items-center gap-1.5 rounded-xl px-2 py-1.5 text-[12.5px] ${j.yo ? "bg-amber-400/20 ring-1 ring-amber-300/60" : j.bot ? "bg-sky-900/40" : "bg-black/30"}`}>
                  <span aria-hidden="true">{j.bot ? { facil: "🌱", normal: "🌿", dificil: "🌳" }[j.bot] : ICONO_CAMINO[j.camino]}</span>
                  <span className="min-w-0 flex-1 truncate font-bold">{j.nombre}</span>
                  {j.anfitrion && <Crown className="h-3.5 w-3.5 shrink-0 text-amber-300" aria-label="abrió la sala" />}
                  {n.soyAnfitrion && !j.yo && (
                    <button type="button" className="rounded-full p-0.5 text-amber-100/60 hover:bg-white/10 hover:text-white" onClick={() => void quitar(j.pid, !!j.bot)} aria-label={j.bot ? `Quitar a ${j.nombre}` : `Sacar a ${j.nombre} de la sala`} data-testid={`noche-quitar-${j.pid}`}>
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </li>
              ))}
              {Array.from({ length: Math.max(0, NOCHE_MIN - n.jugadores.length) }, (_, i) => (
                <li key={`vacio-${i}`} className="rounded-xl border border-dashed border-amber-200/30 px-2 py-1.5 text-center text-[11.5px] text-amber-100/50">
                  esperando…
                </li>
              ))}
            </ul>
            <p className="text-center text-[11px] text-amber-100/70">
              {n.jugadores.length} de {NOCHE_MAX} · la sala se cierra sola en {Math.ceil(espera / 60)} min si nadie la empieza
            </p>
            {n.soyAnfitrion && n.jugadores.length < NOCHE_MAX && (
              <div className="space-y-1.5 rounded-xl bg-sky-950/40 p-2.5" data-testid="noche-companeros">
                <p className="text-center text-[12px] font-bold text-sky-100">🤖 ¿No hay nadie? Juega con compañeros de la computadora</p>
                <div className="flex justify-center gap-1.5">
                  {(
                    [
                      ["facil", "🌱 Fácil"],
                      ["normal", "🌿 Normal"],
                      ["dificil", "🌳 Difícil"],
                    ] as const
                  ).map(([nivel, texto]) => (
                    <button
                      key={nivel}
                      type="button"
                      disabled={enviando}
                      className="rounded-full bg-white/10 px-3 py-1 text-[12px] font-bold hover:bg-white/20 disabled:opacity-50"
                      onClick={() => void agregarBot(nivel)}
                      aria-label={`Agregar un compañero de la computadora, nivel ${texto.slice(3).toLowerCase()}`}
                      data-testid={`noche-bot-${nivel}`}
                    >
                      {texto}
                    </button>
                  ))}
                </div>
                <p className="text-center text-[10.5px] text-sky-100/70">Con ellos la noche es de práctica: hasta 4 de gozo y sin puntos para la copa.</p>
              </div>
            )}
            <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-2.5 text-sm font-bold hover:bg-white/20" onClick={() => setInvitar(true)} data-testid="noche-invitar-abrir">
              <UserPlus className="h-4 w-4" /> Invitar a vecinos y amigos en línea
            </button>
            {n.soyAnfitrion && (
              <button type="button" className="sabio-boton w-full py-3" disabled={enviando || n.jugadores.length < NOCHE_MIN} onClick={() => void empezar()} data-testid="noche-empezar">
                {n.jugadores.length < NOCHE_MIN ? `Faltan ${NOCHE_MIN - n.jugadores.length} para empezar` : `🌙 Empezar la noche con ${n.jugadores.length}`}
              </button>
            )}
          </>
        )}
        {aviso && <p className="rounded-xl bg-red-950/70 px-3 py-2 text-center text-xs" data-testid="noche-aviso">{aviso}</p>}
        <p className="text-center font-serif text-[12px] italic text-amber-100/70">
          «{VERSO_SALA.text}» <span className="not-italic font-semibold text-amber-300">{VERSO_SALA.ref}</span>
        </p>
        <button type="button" className="w-full rounded-xl bg-white/5 py-2 text-xs font-bold text-amber-100/80 hover:bg-white/10" onClick={() => void dejar()} data-testid="noche-salir">
          {n.estado === "cancelada" ? "Volver" : "Salir de la sala"}
        </button>
        {invitar && n.estado === "sala" && <Invitar id={id} onCerrar={() => setInvitar(false)} />}
      </div>
    );

  // ---------------------------------------------------------------- la noche
  const q = n.pregunta;
  const rv = n.revelado;
  const fin = n.fin;
  const terminada = n.estado === "terminada";
  const yo = n.jugadores.find((j) => j.yo);
  const dice = terminada
    ? fin?.podio[0]
      ? fin.puesto === 1
        ? "¡Ganaste la noche de los sabios!"
        : `¡${fin.podio[0].nombre} ganó la noche de los sabios!`
      : "La noche terminó."
    : q
      ? n.miRespuesta
        ? `Esperando al resto… (${n.respondieron} de ${n.activos})`
        : mirar
          ? `Pregunta ${q.n}: ${n.respondieron} de ${n.activos} ya respondieron.`
          : `Pregunta ${q.n} de ${NOCHE_PREGUNTAS}: ${NOCHE_SEGUNDOS} segundos. ¡Respondan a la vez!`
      : rv
        ? `${rv.bien} de ${n.activos} acertaron. ${rv.n >= NOCHE_PREGUNTAS ? "¡Y ahora, el podio!" : `La pregunta ${rv.n + 1} en ${espera}…`}`
        : `¡Prepárense! La primera pregunta en ${espera}…`;
  return (
    <div className="sabio-panel mx-auto mt-auto flex w-full max-w-3xl flex-col gap-2 rounded-t-3xl px-2 pb-1 pt-2" data-testid="noche">
      <div className="flex items-center justify-between gap-2">
        <p className="min-w-0 truncate text-[11px] font-bold uppercase tracking-widest text-amber-200/85" data-testid="noche-ronda">
          {mirar && <span className="mr-1 inline-block h-2 w-2 rounded-full bg-red-500 align-middle" aria-hidden="true" />}🌙 Pregunta {Math.max(1, n.ronda)} de {NOCHE_PREGUNTAS}
          {yo ? ` · puesto ${yo.puesto} · ${miles(yo.puntos)} puntos` : ""}
        </p>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-bold" title="Miran en vivo">
          <Eye className="h-3.5 w-3.5" /> {n.mirando}
        </span>
      </div>
      <Presentador dice={dice} compacto />
      {q && !terminada && (
        <>
          <div className="flex items-center gap-2">
            <div className="sabio-pregunta min-w-0 flex-1 rounded-2xl px-3 py-2.5 text-center font-serif text-[15px] font-semibold leading-snug" data-testid="noche-pregunta">
              {q.texto}
            </div>
            <Reloj restan={restan} total={q.segundos} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {q.opciones.map((o, i) => {
              const mia = n.miRespuesta === o;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={mirar || !!n.miRespuesta || enviando || restan <= 0}
                  onClick={() => void responder(o)}
                  className={`flex min-h-[44px] items-center gap-2 rounded-xl px-2.5 py-1.5 text-left text-[13px] font-semibold leading-tight transition ${mia ? "sabio-op-fija" : n.miRespuesta ? "sabio-op opacity-60" : "sabio-op"}`}
                  data-testid={`noche-opcion-${i}`}
                >
                  <span className={`font-black ${mia ? "" : "text-amber-300"}`}>{LETRAS[i]}:</span>
                  <span className="min-w-0 flex-1">{o}</span>
                </button>
              );
            })}
          </div>
          <p className="text-center text-[11.5px] font-bold text-amber-100/80" data-testid="noche-respondieron">
            {n.respondieron} de {n.activos} ya respondieron
          </p>
        </>
      )}
      {!q && rv && (
        <>
          <div className="sabio-pregunta rounded-2xl px-3 py-2 text-center font-serif text-[14px] font-semibold leading-snug" data-testid="noche-revelado">
            {rv.texto}
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {rv.opciones.map((o, i) => {
              const buena = o === rv.correcta;
              return (
                <div key={i} className={`flex min-h-[38px] items-center gap-1.5 rounded-xl px-2.5 py-1 text-[12.5px] font-semibold leading-tight ${buena ? "sabio-op-bien" : o === rv.mia ? "sabio-op-mal" : "sabio-op opacity-60"}`}>
                  <span className="font-black">{LETRAS[i]}:</span>
                  <span className="min-w-0 flex-1">{o}</span>
                  <span className="shrink-0 rounded-full bg-black/25 px-1.5 text-[10px] font-black" title="Cuántos la eligieron">{rv.conteo[i]}</span>
                </div>
              );
            })}
          </div>
          {n.juego && (
            <p className={`rounded-xl py-1 text-center text-[12.5px] font-black ${rv.misPuntos ? "bg-emerald-900/50" : "bg-white/5"}`} data-testid="noche-mis-puntos">
              {rv.misPuntos ? `¡+${rv.misPuntos} puntos!` : rv.mia ? "Esa no era…" : "No alcanzaste a responder."}
            </p>
          )}
          <p className="rounded-2xl bg-black/30 px-3 py-2 text-[12px] leading-snug">
            {rv.explica} <span className="font-semibold text-amber-300">({rv.ref})</span>
          </p>
        </>
      )}
      {(rv || terminada) && <TablaEnVivo jugadores={n.jugadores} ronda={rv?.n ?? n.ronda} />}
      {terminada && fin && (
        <div className="space-y-1.5 rounded-2xl bg-amber-400/15 p-3 text-center" data-testid="noche-fin">
          <p className="sabio-titulo font-serif text-xl font-black">{fin.puesto ? `Quedaste en el puesto ${fin.puesto}` : "La noche terminó"}</p>
          {n.juego || fin.puesto ? (
            <p className="text-sm font-bold" data-testid="noche-fin-gozo">
              ✨ +{fin.gozo} de gozo{fin.topeGozo ? " (llegaste al tope de hoy)" : ""}
            </p>
          ) : null}
          <p className="font-serif text-[12px] italic text-amber-100/80">
            «{VERSO_NOCHE.text}» <span className="not-italic font-semibold text-amber-300">{VERSO_NOCHE.ref}</span>
          </p>
          <button type="button" className="sabio-boton w-full" onClick={onSalir} data-testid="noche-volver">
            Volver a la casa de la sabiduría
          </button>
        </div>
      )}
      {aviso && <p className="rounded-xl bg-red-950/70 px-3 py-2 text-center text-xs">{aviso}</p>}
      {!terminada &&
        (salir ? (
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-white/5 p-2 text-xs">
            <p className="col-span-2 text-center">{mirar ? "¿Dejas de mirar?" : "Si sales ahora, dejas la noche y no ganas nada. ¿De verdad sales?"}</p>
            <button type="button" className="rounded-xl bg-red-800/80 py-2 font-bold" onClick={() => void dejar()} data-testid="noche-salir-si">
              Sí, salgo
            </button>
            <button type="button" className="rounded-xl bg-white/10 py-2 font-bold" onClick={() => setSalir(false)}>
              Me quedo
            </button>
          </div>
        ) : (
          <button type="button" className="w-full rounded-xl bg-white/5 py-1.5 text-xs font-bold text-amber-100/80 hover:bg-white/10" onClick={() => setSalir(true)} data-testid="noche-salir">
            {mirar ? "Dejar de mirar" : "Dejar la noche"}
          </button>
        ))}
    </div>
  );
}

/** El código de la sala, grande, para dictarlo o copiarlo. */
function CodigoSala({ codigo }: { codigo: string }) {
  const [copiado, setCopiado] = useState(false);
  async function copiar() {
    try {
      await navigator.clipboard.writeText(codigo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1800);
    } catch {
      /* sin portapapeles */
    }
  }
  return (
    <div className="flex items-center justify-center gap-2 rounded-2xl bg-black/40 p-2.5 ring-1 ring-amber-300/50" data-testid="noche-codigo-sala">
      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-200/80">Código</span>
      <span className="font-mono text-2xl font-black tracking-[0.3em] text-amber-100" data-testid="noche-codigo-texto">
        {codigo}
      </span>
      <button type="button" className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold hover:bg-white/20" onClick={() => void copiar()} aria-label="Copiar el código">
        <Copy className="h-3.5 w-3.5" /> {copiado ? "¡Copiado!" : "Copiar"}
      </button>
    </div>
  );
}

/** A quién invitar: vecinos y amigos que están ahora en la ciudad (no los que juegan o están en otra sala). */
function Invitar({ id, onCerrar }: { id: number; onCerrar: () => void }) {
  const [amigos, setAmigos] = useState<InvitablesNoche[] | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState<number | null>(null);
  const cargar = useCallback(async () => {
    const r = await pedir<{ amigos: InvitablesNoche[] }>("/noche-amigos");
    setAmigos(r.ok && r.data?.amigos ? r.data.amigos : []);
  }, []);
  useEffect(() => {
    void cargar();
  }, [cargar]);
  async function invitar(a: InvitablesNoche) {
    setOcupado(a.personajeId);
    setAviso(null);
    const r = await pedir<{ noche: NocheVista }>(`/noche/${id}/invitar`, { a: a.personajeId });
    setOcupado(null);
    if (r.ok) {
      setAmigos((l) => (l ? l.map((x) => (x.personajeId === a.personajeId ? { ...x, invitado: true } : x)) : l));
      setAviso(`¡Le llegó la invitación a ${a.nombre}!`);
    } else {
      setAviso(r.data?.message || "No se pudo invitar.");
      void cargar();
    }
  }
  return (
    <div className="absolute inset-0 z-20 flex items-end justify-center bg-black/70 p-3 sm:items-center" onClick={onCerrar} data-testid="noche-invitar">
      <div className="max-h-full w-full max-w-md overflow-y-auto rounded-2xl border border-amber-300/50 bg-[#150e36] p-3" onClick={(e) => e.stopPropagation()}>
        <p className="font-serif text-lg font-black text-amber-200">🌙 ¿A quién invitas?</p>
        <p className="text-[12px] text-amber-100/75">Les llega tu invitación con el código de la sala. También puedes pasarles el código por WhatsApp.</p>
        {amigos === null ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-amber-300" />
          </div>
        ) : amigos.length === 0 ? (
          <p className="mt-2 rounded-xl bg-white/5 p-3 text-center text-[12px] text-amber-100/75" data-testid="noche-invitar-vacio">
            Ahora ninguno de tus vecinos ni amigos está en la ciudad (o están jugando). Pásales el código.
          </p>
        ) : (
          <ul className="mt-2 space-y-1.5" data-testid="noche-invitables">
            {amigos.map((a) => (
              <li key={a.personajeId}>
                <button
                  type="button"
                  disabled={ocupado !== null || a.invitado}
                  onClick={() => void invitar(a)}
                  className="flex w-full items-center gap-2 rounded-xl bg-indigo-900/40 p-2 text-left ring-1 ring-indigo-300/30 hover:bg-indigo-900/70 disabled:opacity-60"
                  data-testid={`noche-invitar-${a.personajeId}`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg" aria-hidden="true">{ICONO_CAMINO[a.camino]}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-black">{a.nombre}</span>
                    <span className="block truncate text-[11px] text-amber-100/70">
                      {RELACION[a.relacion]} · {a.donde}
                    </span>
                  </span>
                  <span className="shrink-0 rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-black text-amber-950">{a.invitado ? "Invitado ✓" : ocupado === a.personajeId ? "…" : "Invitar"}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {aviso && <p className="mt-2 rounded-xl bg-white/10 px-3 py-2 text-center text-xs" data-testid="noche-invitar-aviso">{aviso}</p>}
        <button type="button" className="mt-3 w-full rounded-xl bg-white/10 py-2 text-sm font-bold hover:bg-white/20" onClick={onCerrar}>
          Listo
        </button>
      </div>
    </div>
  );
}

/**
 * La tabla en vivo: cada fila se desliza a su puesto nuevo (primero se ve el orden de antes de la pregunta y luego el
 * de ahora), con flechas que dicen quién subió y quién bajó y los puntos que ganó cada uno en esta pregunta.
 */
const ALTO_FILA = 34;
function TablaEnVivo({ jugadores, ronda }: { jugadores: NocheJugadorVista[]; ronda: number }) {
  const [deAntes, setDeAntes] = useState(true);
  useEffect(() => {
    setDeAntes(true);
    const t = setTimeout(() => setDeAntes(false), 650);
    return () => clearTimeout(t);
  }, [ronda]);
  const orden = useMemo(() => {
    const ahora = [...jugadores].sort((a, b) => Number(a.fuera) - Number(b.fuera) || a.puesto - b.puesto);
    if (!deAntes) return ahora;
    return [...jugadores].sort((a, b) => Number(a.fuera) - Number(b.fuera) || (a.antes ?? a.puesto) - (b.antes ?? b.puesto));
  }, [jugadores, deAntes]);
  const pos = new Map(orden.map((j, i) => [j.pid, i]));
  return (
    <div className="relative rounded-2xl bg-black/35" style={{ height: jugadores.length * ALTO_FILA + 6 }} data-testid="noche-tabla" aria-label="La tabla en vivo">
      {jugadores.map((j) => {
        const sube = j.antes !== null && j.puesto < j.antes;
        const baja = j.antes !== null && j.puesto > j.antes;
        return (
          <div
            key={j.pid}
            className={`absolute inset-x-1 flex items-center gap-1.5 rounded-xl px-2 text-[12.5px] ${j.yo ? "bg-amber-400/25 ring-1 ring-amber-300/60" : ""} ${j.fuera ? "opacity-45" : ""}`}
            style={{ height: ALTO_FILA - 2, top: 3, transform: `translateY(${(pos.get(j.pid) ?? 0) * ALTO_FILA}px)`, transition: "transform .75s cubic-bezier(.2,.8,.2,1)" }}
            data-testid={`noche-fila-${j.pid}`}
          >
            <span className="w-6 shrink-0 text-center font-black">{j.fuera ? "–" : j.puesto <= 3 ? MEDALLAS[j.puesto - 1] : j.puesto}</span>
            <span aria-hidden="true">{ICONO_CAMINO[j.camino]}</span>
            <span className="min-w-0 flex-1 truncate font-bold">
              {j.nombre}
              {j.yo ? " (tú)" : ""}
              {j.fuera ? " · se fue" : ""}
            </span>
            {!deAntes && sube && <span className="sabio-sube shrink-0 text-[11px] font-black text-emerald-300" aria-label={`subió ${j.antes! - j.puesto}`}>▲{j.antes! - j.puesto}</span>}
            {!deAntes && baja && <span className="sabio-baja shrink-0 text-[11px] font-black text-red-300" aria-label={`bajó ${j.puesto - j.antes!}`}>▼{j.puesto - j.antes!}</span>}
            {j.gano > 0 && <span className="shrink-0 rounded-full bg-emerald-900/60 px-1.5 text-[10.5px] font-black text-emerald-200">+{j.gano}</span>}
            {j.bien === false && <span className="shrink-0 text-[10.5px] text-red-200/80">✗</span>}
            <span className="w-14 shrink-0 text-right font-black tabular-nums">{miles(j.puntos)}</span>
          </div>
        );
      })}
    </div>
  );
}

/** Lo que dura la vista de cada respuesta en la noche (para los textos). */
export const NOCHE_REVELAR = NOCHE_REVELAR_S;
