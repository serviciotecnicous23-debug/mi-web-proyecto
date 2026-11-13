/**
 * El duelo de sabios (shared/sabio.ts, server/sabio-duelo.ts), dentro de la casa de la sabiduría: la sala (a quién
 * retar, buscar a alguien, practicar contra la computadora, los duelos de hoy y la tabla de la semana) y el duelo
 * mismo: los dos con sus puntos, la pregunta con su reloj, la ronda cerrada con lo que respondió cada uno (y su cita)
 * y el resultado. Se pregunta al servidor cada segundo y la red de la ciudad avisa los cambios; aquí nunca está la
 * respuesta antes de tiempo (tampoco la del rival de la computadora: la decide el servidor).
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Search, Swords } from "lucide-react";
import { NIVELES_BOT, type NivelBot } from "@shared/mesa";
import {
  DUELO_RONDAS, DUELO_SEGUNDOS, DUELOS_DIA, DUELOS_MANTO, GOZO_DUELO, GOZO_PRACTICA_DUELO, VERSO_DUELO, type DueloVista, type DuelosEstado,
} from "@shared/sabio";
import { ICONO_CAMINO } from "./barrio-chat";
import { LETRAS, Presentador, RELACION, Reloj, miles, pedir, primerNombre } from "./sabio-comun";
import { sabioRed } from "./sabio-red";
import { sonido } from "./sabio-sonido";
import { Ico } from "./iconos";

/** Cómo juega el rival de la computadora en el duelo, por nivel (shared/sabio.ts, BOT_SABIO). */
const COMO_JUEGA: Record<NivelBot, string> = {
  facil: "Contesta sin prisa y a veces falla.",
  normal: "Acierta dos de cada tres.",
  dificil: "Rápido y sabe mucho.",
};
const NIVELES = Object.keys(NIVELES_BOT) as NivelBot[];

/** Empieza un duelo de práctica contra la computadora (si ya hay un duelo en curso, el servidor lo devuelve). */
async function empezarPractica(nivel: NivelBot): Promise<{ id: number | null; aviso: string | null }> {
  const r = await pedir<{ duelo: DueloVista | null }>("/duelo/computadora", { nivel });
  const d = r.data?.duelo;
  if (d && (r.ok || d.estado === "jugando" || d.estado === "invitado")) return { id: d.id, aviso: null };
  return { id: null, aviso: r.data?.message || "No se pudo empezar la práctica. Revisa tu conexión." };
}

// ================================================================ la sala de los duelos
export function DuelosLobby({ onEntrar, onVolver }: { onEntrar: (id: number) => void; onVolver: () => void }) {
  const [e, setE] = useState<DuelosEstado | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState(false);
  const [buscando, setBuscando] = useState(false);
  const [practica, setPractica] = useState(false);
  const entrar = useRef(onEntrar);
  entrar.current = onEntrar;

  const cargar = useCallback(async () => {
    const r = await pedir<DuelosEstado>("/duelos");
    if (r.ok && r.data) {
      setE(r.data);
      setBuscando(r.data.buscando);
    } else setAviso(r.data?.message || "No se pudo abrir la sala de los duelos. Revisa tu conexión.");
  }, []);
  useEffect(() => {
    void cargar();
    const t = setInterval(() => void cargar(), 12_000);
    // al salir de la sala se deja de buscar
    return () => {
      clearInterval(t);
      void pedir("/duelo/buscar", undefined, "DELETE");
    };
  }, [cargar]);

  // mientras busca: cada 2 s se pregunta si apareció alguien
  useEffect(() => {
    if (!buscando) return;
    let parar = false;
    const t = setInterval(async () => {
      const r = await pedir<{ duelo: DueloVista | null; buscando: boolean }>("/duelo");
      if (parar || !r.ok || !r.data) return;
      if (r.data.duelo?.estado === "jugando") {
        entrar.current(r.data.duelo.id);
        return;
      }
      if (!r.data.buscando) {
        setBuscando(false);
        setAviso("Nadie más buscaba un duelo ahora. Prueba otra vez en un rato, o reta a un amigo.");
      }
    }, 2000);
    return () => {
      parar = true;
      clearInterval(t);
    };
  }, [buscando]);

  async function retar(personajeId: number) {
    setOcupado(true);
    setAviso(null);
    const r = await pedir<{ duelo: DueloVista }>("/duelo/retar", { a: personajeId });
    setOcupado(false);
    if (r.ok && r.data?.duelo) {
      sonido.reto();
      onEntrar(r.data.duelo.id);
      return;
    }
    setAviso(r.data?.message || "No se pudo retar.");
    void cargar();
  }

  async function buscar() {
    setOcupado(true);
    setAviso(null);
    const r = await pedir<{ duelo: DueloVista | null; buscando: boolean }>("/duelo/buscar", {});
    setOcupado(false);
    if (!r.ok || !r.data) {
      setAviso(r.data?.message || "No se pudo buscar. Revisa tu conexión.");
      return;
    }
    if (r.data.duelo) onEntrar(r.data.duelo.id);
    else setBuscando(r.data.buscando);
  }

  async function dejarDeBuscar() {
    setBuscando(false);
    await pedir("/duelo/buscar", undefined, "DELETE");
  }

  // practicar contra la computadora (el servidor deja de buscar rival)
  async function practicar(nivel: NivelBot) {
    setOcupado(true);
    setAviso(null);
    setBuscando(false);
    const r = await empezarPractica(nivel);
    setOcupado(false);
    if (r.id !== null) {
      sonido.reto();
      onEntrar(r.id);
    } else setAviso(r.aviso);
  }

  const quedan = e ? Math.max(0, DUELOS_DIA - e.hoy) : 0;
  return (
    <div className="mx-auto max-w-2xl space-y-3 pt-2" data-testid="sabio-duelos">
      <p className="sabio-titulo text-center font-serif text-2xl font-black">⚔️ Duelo de sabios</p>
      <Presentador dice={`Dos sabios, las mismas ${DUELO_RONDAS} preguntas a la vez. Acertar vale 100 puntos, y hasta 100 más si respondes rápido. ¿A quién retas?`} />
      {!e ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-amber-300" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2 text-center" data-testid="sabio-duelos-yo">
            <div className="rounded-xl bg-white/10 px-2 py-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-200/70">Hoy</p>
              <p className="text-sm font-black">
                {e.hoy} de {DUELOS_DIA}
              </p>
            </div>
            <div className="rounded-xl bg-white/10 px-2 py-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-200/70">Ganados</p>
              <p className="text-sm font-black">{e.ganados}</p>
            </div>
            <div className="rounded-xl bg-white/10 px-2 py-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-200/70">Jugados</p>
              <p className="text-sm font-black">{e.jugados}</p>
            </div>
          </div>
          {e.ganados < DUELOS_MANTO && <p className="text-center text-[11px] text-amber-100/70">Gana {DUELOS_MANTO - e.ganados} duelos más para el manto azul de los vencedores.</p>}
          {buscando ? (
            <div className="flex items-center gap-2 rounded-2xl bg-sky-950/60 p-3 text-[13px]" data-testid="sabio-duelo-buscando">
              <Loader2 className="h-5 w-5 shrink-0 animate-spin text-sky-300" />
              <p className="min-w-0 flex-1">Buscando a alguien que también quiera un duelo…</p>
              <button type="button" className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold hover:bg-white/20" onClick={() => void dejarDeBuscar()} data-testid="sabio-duelo-dejar">
                Dejar de buscar
              </button>
            </div>
          ) : (
            <button type="button" className="sabio-boton flex w-full items-center justify-center gap-2" disabled={ocupado || quedan <= 0} onClick={() => void buscar()} data-testid="sabio-duelo-buscar">
              <Search className="h-4 w-4" /> {quedan > 0 ? "Buscar a alguien para un duelo" : "Mañana hay más duelos"}
            </button>
          )}
          <div className="space-y-2 rounded-2xl bg-sky-950/60 p-2" data-testid="sabio-duelo-practica">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-2.5 text-sm font-bold hover:bg-white/20"
              aria-expanded={practica}
              onClick={() => setPractica((x) => !x)}
              data-testid="sabio-duelo-practicar"
            >
              🤖 Practicar contra la computadora
            </button>
            {practica && (
              <>
                <div className="grid grid-cols-3 gap-1.5">
                  {NIVELES.map((n) => (
                    <button
                      key={n}
                      type="button"
                      disabled={ocupado}
                      onClick={() => void practicar(n)}
                      className="rounded-xl bg-white/10 px-1.5 py-2 text-center text-[12.5px] font-black hover:bg-white/20 disabled:opacity-50"
                      aria-label={`Practicar contra la computadora, nivel ${NIVELES_BOT[n].nombre.toLowerCase()}`}
                      data-testid={`sabio-duelo-bot-${n}`}
                    >
                      <span className="block text-lg leading-none" aria-hidden="true">
                        <Ico e={NIVELES_BOT[n].icono} />
                      </span>
                      <span className="mt-1 block">{NIVELES_BOT[n].nombre}</span>
                      <span className="mt-0.5 block text-[10.5px] font-semibold leading-tight text-sky-100/75">{COMO_JUEGA[n]}</span>
                    </button>
                  ))}
                </div>
                <p className="text-center text-[11px] leading-snug text-sky-100/80">
                  Es de práctica: +{GOZO_PRACTICA_DUELO.gana} de gozo si ganas, +{GOZO_PRACTICA_DUELO.empate} si empatan y +{GOZO_PRACTICA_DUELO.pierde} por jugar. No gasta tus duelos del día ni cuenta para el manto ni para la tabla.
                </p>
              </>
            )}
          </div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-amber-200/80">Retar a un amigo o vecino en línea</p>
          {e.rivales.length === 0 ? (
            <p className="rounded-xl bg-white/5 p-3 text-center text-[12px] text-amber-100/75" data-testid="sabio-rivales-vacio">
              Ahora ninguno de tus amigos ni vecinos está en la ciudad (o están jugando). Busca a alguien con el botón de arriba, o practica contra la computadora.
            </p>
          ) : (
            <ul className="space-y-1.5" data-testid="sabio-rivales">
              {e.rivales.map((a) => (
                <li key={a.personajeId} className="flex items-center gap-2 rounded-xl bg-black/30 p-2">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg" aria-hidden="true">
                    {ICONO_CAMINO[a.camino]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-black">{a.nombre}</span>
                    <span className="block truncate text-[11px] text-amber-100/70">
                      {RELACION[a.relacion]} · {a.donde}
                    </span>
                  </span>
                  <button
                    type="button"
                    disabled={ocupado || quedan <= 0}
                    onClick={() => void retar(a.personajeId)}
                    className="flex shrink-0 items-center gap-1 rounded-full bg-amber-400 px-3 py-1.5 text-[11px] font-black text-amber-950 disabled:opacity-50"
                    data-testid={`sabio-retar-${a.personajeId}`}
                  >
                    <Swords className="h-3.5 w-3.5" /> Retar
                  </button>
                </li>
              ))}
            </ul>
          )}
          {aviso && <p className="rounded-xl bg-red-950/70 px-3 py-2 text-center text-xs" data-testid="sabio-duelos-aviso">{aviso}</p>}
          <p className="text-[11px] font-bold uppercase tracking-wider text-amber-200/80">Duelos ganados esta semana</p>
          {e.tabla.length === 0 ? (
            <p className="rounded-2xl bg-black/30 py-3 text-center text-xs text-amber-100/70">Esta semana nadie ha ganado un duelo todavía. ¡Sé el primero!</p>
          ) : (
            <ol className="divide-y divide-white/10 rounded-2xl bg-black/30" data-testid="sabio-duelos-tabla">
              {e.tabla.map((f) => (
                <li key={`${f.puesto}-${f.nombre}`} className={`flex items-center gap-2 px-3 py-2 text-[13px] ${f.esYo ? "bg-amber-400/20" : ""}`}>
                  <span className="w-6 text-center font-black">{f.puesto <= 3 ? ["🥇", "🥈", "🥉"][f.puesto - 1] : f.puesto}</span>
                  <span className="min-w-0 flex-1 truncate font-bold">
                    {f.nombre}
                    {f.esYo ? " (tú)" : ""}
                  </span>
                  <span className="text-[11px] text-amber-200/70">de {f.jugados}</span>
                  <span className="w-10 text-right font-black tabular-nums">{f.ganados} ⚔️</span>
                </li>
              ))}
            </ol>
          )}
          <div className="space-y-1 rounded-2xl bg-black/30 p-3 text-[12px] leading-snug" data-testid="sabio-duelos-reglas">
            <p>• {DUELO_RONDAS} preguntas, de la grada 1 a la 10, las mismas para los dos y a la vez. Tienes {DUELO_SEGUNDOS} segundos en cada una.</p>
            <p>• Si aciertas: 100 puntos y hasta 100 más por la rapidez. Al cerrar cada ronda ves lo que respondió el otro.</p>
            <p>
              • Al terminar: +{GOZO_DUELO.gana} de gozo si ganas, +{GOZO_DUELO.empate} si empatan y +{GOZO_DUELO.pierde} por jugar (dentro del tope de gozo del concurso). Quien deja el duelo lo pierde.
            </p>
            <p>• {DUELOS_DIA} duelos por día. Las preguntas no se te repiten con las del atril.</p>
            <p>
              • 🤖 Contra la computadora practicas cuando quieras, aunque no haya nadie en línea: el rival contesta con su propio tiempo y no siempre acierta. Hasta +{GOZO_PRACTICA_DUELO.gana} de gozo.
            </p>
          </div>
        </>
      )}
      <p className="text-center font-serif text-[12px] italic text-amber-100/70">
        «{VERSO_DUELO.text}» <span className="not-italic font-semibold text-amber-300">{VERSO_DUELO.ref}</span>
      </p>
      <button type="button" className="w-full rounded-xl bg-white/10 py-2.5 text-sm font-bold hover:bg-white/20" onClick={onVolver} data-testid="sabio-duelos-volver">
        Volver a la casa de la sabiduría
      </button>
    </div>
  );
}

// ================================================================ el duelo
const TERMINADOS = new Set(["terminado", "rechazado", "vencido", "cancelado"]);

export function DueloView({ id, onSalir, onCambiar }: { id: number; onSalir: () => void; onCambiar: (id: number) => void }) {
  const [d, setD] = useState<DueloVista | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [restan, setRestan] = useState(0);
  const [espera, setEspera] = useState(0);
  const [enviando, setEnviando] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const [salir, setSalir] = useState(false);
  const finPregunta = useRef(0);
  const finEspera = useRef(0);
  const clave = useRef("");
  const sonoFin = useRef(false);
  const ultimoTic = useRef(-1);
  const termino = useRef(false);

  const aplicar = useCallback((x: DueloVista) => {
    setD(x);
    termino.current = TERMINADOS.has(x.estado);
    if (x.pregunta) finPregunta.current = Date.now() + x.pregunta.restantes * 1000;
    finEspera.current = Date.now() + x.espera * 1000;
    // los sonidos: la primera pregunta, cada ronda cerrada (si acerté o no) y el final
    const k = x.revelado ? `r${x.revelado.n}` : x.pregunta ? `p${x.pregunta.n}` : x.estado;
    if (k !== clave.current) {
      if (clave.current !== "") {
        if (x.revelado && k.startsWith("r")) (x.revelado.mia === x.revelado.correcta ? sonido.bien : sonido.mal)();
        else if (k === "p1") sonido.entrada();
      }
      clave.current = k;
    }
    if (x.fin && !sonoFin.current) {
      sonoFin.current = true;
      if (x.fin.gane) sonido.ganar();
      else if (x.fin.empate) sonido.segura();
    }
  }, []);

  const traer = useCallback(async () => {
    const r = await pedir<{ duelo: DueloVista }>(`/duelo/${id}`);
    if (!r.ok || !r.data?.duelo) {
      if (r.status === 404 || r.status === 400) setError(r.data?.message || "Ese duelo ya no está.");
      return;
    }
    aplicar(r.data.duelo);
  }, [id, aplicar]);

  useEffect(() => {
    clave.current = "";
    sonoFin.current = false;
    termino.current = false;
    setD(null);
    setError(null);
    void traer();
    const t = setInterval(() => {
      if (!termino.current) void traer();
    }, 1000);
    const quitar = sabioRed.onDuelo((x) => {
      if (x === id) void traer();
    });
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
  }, [id, traer]);

  async function responder(o: string) {
    if (!d?.pregunta || d.miRespuesta || enviando) return;
    setEnviando(true);
    setAviso(null);
    setD({ ...d, miRespuesta: o, yo: { ...d.yo, respondio: true } });
    const r = await pedir<{ duelo: DueloVista | null }>(`/duelo/${id}/responder`, { opcion: o });
    setEnviando(false);
    if (r.data?.duelo) aplicar(r.data.duelo);
    if (!r.ok) setAviso(r.data?.message || "No se pudo mandar la respuesta.");
  }

  async function dejar() {
    setSalir(false);
    const r = await pedir<{ duelo: DueloVista }>(`/duelo/${id}/salir`, {});
    if (r.data?.duelo) aplicar(r.data.duelo);
    if (r.data?.duelo && r.data.duelo.estado !== "terminado") onSalir();
  }

  async function revancha() {
    if (!d) return;
    setAviso(null);
    // contra la computadora: otra práctica del mismo nivel
    if (d.bot) {
      const p = await empezarPractica(d.bot);
      if (p.id !== null) {
        sonido.reto();
        onCambiar(p.id);
      } else setAviso(p.aviso);
      return;
    }
    const r = await pedir<{ duelo: DueloVista }>("/duelo/retar", { a: d.rivalId });
    if (r.ok && r.data?.duelo) {
      sonido.reto();
      onCambiar(r.data.duelo.id);
    } else setAviso(r.data?.message || "No se pudo pedir la revancha.");
  }

  if (error)
    return (
      <div className="mx-auto max-w-md space-y-3 pt-8 text-center" data-testid="sabio-duelo">
        <p className="rounded-xl bg-white/5 p-4 text-sm">{error}</p>
        <button type="button" className="sabio-boton w-full" onClick={onSalir} data-testid="sabio-duelo-volver">
          Volver a la sala de los duelos
        </button>
      </div>
    );
  if (!d)
    return (
      <div className="flex h-full items-center justify-center" data-testid="sabio-duelo">
        <Loader2 className="h-8 w-8 animate-spin text-amber-300" />
      </div>
    );

  // el rival de la computadora siempre se ve como tal: su nombre lleva 🤖
  const rival = d.bot ? d.rival.nombre : primerNombre(d.rival.nombre);
  const iconoRival = d.bot ? NIVELES_BOT[d.bot].icono : ICONO_CAMINO[d.rival.camino];
  // el reto que mandé: esperando que acepte
  if (d.estado === "invitado" || d.estado === "rechazado" || d.estado === "vencido" || d.estado === "cancelado") {
    const texto =
      d.estado === "invitado"
        ? `Le avisamos a ${d.rival.nombre}. Tiene ${espera} segundos para aceptar tu reto…`
        : d.estado === "rechazado"
          ? `${d.rival.nombre} no puede ahora. ¡Otra vez será!`
          : d.estado === "vencido"
            ? `${d.rival.nombre} no alcanzó a aceptar el reto.`
            : "El duelo se canceló.";
    return (
      <div className="mx-auto max-w-md space-y-3 pt-4" data-testid="sabio-duelo">
        <p className="sabio-titulo text-center font-serif text-2xl font-black">⚔️ Duelo de sabios</p>
        <Presentador dice={texto} />
        <div className="flex items-center justify-center gap-3 rounded-2xl bg-black/30 p-4" data-testid="sabio-duelo-espera">
          <span className="text-3xl" aria-hidden="true">
            {ICONO_CAMINO[d.yo.camino]}
          </span>
          <span className="font-serif text-xl font-black text-amber-300">vs</span>
          <span className="text-3xl" aria-hidden="true">
            {ICONO_CAMINO[d.rival.camino]}
          </span>
          {d.estado === "invitado" && <Loader2 className="h-5 w-5 animate-spin text-amber-300" />}
        </div>
        {d.estado === "invitado" ? (
          <button type="button" className="w-full rounded-xl bg-white/10 py-2.5 text-sm font-bold hover:bg-white/20" onClick={() => void dejar()} data-testid="sabio-duelo-cancelar">
            Cancelar el reto
          </button>
        ) : (
          <button type="button" className="sabio-boton w-full" onClick={onSalir} data-testid="sabio-duelo-volver">
            Volver a la sala de los duelos
          </button>
        )}
      </div>
    );
  }

  const q = d.pregunta;
  const rv = d.revelado;
  const fin = d.fin;
  const terminado = d.estado === "terminado";
  const dice = terminado
    ? fin?.abandono
      ? fin.meFui
        ? "Dejaste el duelo… ¡la próxima vez será!"
        : `${d.rival.nombre} dejó el duelo. ¡Ganas tú!`
      : fin?.gane
        ? "¡Ganaste el duelo de sabios!"
        : fin?.empate
          ? "¡Empate! Los dos supieron lo mismo."
          : `${d.rival.nombre} ganó el duelo esta vez.`
    : q
      ? d.miRespuesta
        ? d.rival.respondio
          ? "Los dos respondieron…"
          : `Esperando a ${rival}…`
        : `Ronda ${q.n}: ${DUELO_SEGUNDOS} segundos. ¡Rápido!`
      : rv
        ? rv.mia === rv.correcta
          ? `¡Bien! +${rv.misPuntos} puntos.`
          : rv.mia
            ? "Esa no era…"
            : "Se acabó el tiempo…"
        : `¡Prepárense! La primera pregunta en ${espera}…`;
  return (
    <div className="mx-auto max-w-2xl space-y-2.5 pt-2" data-testid="sabio-duelo">
      {/* el marcador */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2" data-testid="sabio-duelo-marcador">
        <Lado nombre="Tú" detalle={d.yo.nombre} icono={ICONO_CAMINO[d.yo.camino]} puntos={d.yo.puntos} listo={!!q && d.yo.respondio} />
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-200/70">Ronda</p>
          <p className="font-serif text-lg font-black text-amber-200" data-testid="sabio-duelo-ronda">
            {Math.max(1, d.ronda)}/{DUELO_RONDAS}
          </p>
        </div>
        <Lado
          nombre={rival}
          detalle={d.bot ? `${d.rival.nombre} · computadora, nivel ${NIVELES_BOT[d.bot].nombre.toLowerCase()}` : d.rival.nombre}
          icono={iconoRival}
          puntos={d.rival.puntos}
          listo={!!q && d.rival.respondio}
          derecha
        />
      </div>
      {d.bot && (
        <p className="text-center text-[11px] font-bold text-sky-100/85" data-testid="sabio-duelo-de-practica">
          🤖 Práctica contra la computadora · <Ico e={NIVELES_BOT[d.bot].icono} /> {NIVELES_BOT[d.bot].nombre}
        </p>
      )}
      <Presentador dice={dice} />
      {q && !terminado && (
        <>
          <div className="flex items-center gap-2">
            <div className="sabio-pregunta min-w-0 flex-1 rounded-2xl px-3 py-3 text-center font-serif text-[15px] font-semibold leading-snug" data-testid="sabio-duelo-pregunta">
              {q.texto}
            </div>
            <Reloj restan={restan} total={q.segundos} />
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {q.opciones.map((o, i) => {
              const mia = d.miRespuesta === o;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={!!d.miRespuesta || enviando || restan <= 0}
                  onClick={() => void responder(o)}
                  className={`flex min-h-[44px] items-center gap-2 rounded-xl px-3 py-2 text-left text-[14px] font-semibold transition ${mia ? "sabio-op-fija" : d.miRespuesta ? "sabio-op opacity-60" : "sabio-op"}`}
                  data-testid={`sabio-duelo-opcion-${i}`}
                >
                  <span className={`font-black ${mia ? "" : "text-amber-300"}`}>{LETRAS[i]}:</span>
                  <span className="min-w-0 flex-1">{o}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
      {!q && rv && (
        <>
          <div className="sabio-pregunta rounded-2xl px-3 py-3 text-center font-serif text-[15px] font-semibold leading-snug" data-testid="sabio-duelo-revelado">
            {rv.texto}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {rv.opciones.map((o, i) => {
              const buena = o === rv.correcta;
              const clase = buena ? "sabio-op-bien" : o === rv.mia ? "sabio-op-mal" : "sabio-op opacity-60";
              return (
                <div key={i} className={`flex min-h-[40px] items-center gap-2 rounded-xl px-3 py-2 text-[13.5px] font-semibold ${clase}`}>
                  <span className="font-black">{LETRAS[i]}:</span>
                  <span className="min-w-0 flex-1">{o}</span>
                  {o === rv.mia && <span className="rounded-full bg-black/25 px-1.5 text-[10px] font-black">Tú</span>}
                  {o === rv.suya && <span className="max-w-[5.5rem] truncate rounded-full bg-sky-900/70 px-1.5 text-[10px] font-black text-sky-100">{rival}</span>}
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-2 text-center text-[12px] font-bold" data-testid="sabio-duelo-puntos-ronda">
            <p className={`rounded-xl py-1.5 ${rv.misPuntos ? "bg-emerald-900/50" : "bg-white/5"}`}>
              Tú: {rv.misPuntos ? `+${rv.misPuntos}` : rv.mia ? "no era" : "sin responder"}
            </p>
            <p className={`rounded-xl py-1.5 ${rv.susPuntos ? "bg-emerald-900/50" : "bg-white/5"}`}>
              {rival}: {rv.susPuntos ? `+${rv.susPuntos}` : rv.suya ? "no era" : "sin responder"}
            </p>
          </div>
          <p className="rounded-2xl bg-black/30 p-3 text-[12.5px] leading-snug">
            {rv.explica} <span className="font-semibold text-amber-300">({rv.ref})</span>
          </p>
          {!terminado && (
            <p className="text-center text-[12px] font-bold text-amber-200/90" data-testid="sabio-duelo-siguiente">
              {rv.n >= DUELO_RONDAS ? `El resultado en ${espera}…` : `La ronda ${rv.n + 1} empieza en ${espera}…`}
            </p>
          )}
        </>
      )}
      {terminado && fin && (
        <div className={`space-y-2 rounded-2xl p-4 text-center ${fin.gane ? "bg-amber-400/20" : "bg-white/5"}`} data-testid="sabio-duelo-fin">
          <p className={`font-serif text-2xl font-black ${fin.gane ? "sabio-titulo" : ""}`}>{fin.gane ? "¡Ganaste!" : fin.empate ? "¡Empate!" : fin.meFui ? "Dejaste el duelo" : `Ganó ${rival}`}</p>
          <p className="text-sm font-bold">
            {miles(d.yo.puntos)} – {miles(d.rival.puntos)}
          </p>
          <p className="text-sm">
            <Ico e="✨" /> +{fin.gozo} de gozo{d.bot ? " · de práctica" : ""}
          </p>
          {fin.premio && (
            <p className="rounded-xl bg-amber-400/20 p-2 text-sm font-black" data-testid="sabio-duelo-premio">
              ¡Ganaste el {fin.premio}! Ya está en el armario de tu casa.
            </p>
          )}
          <p className="font-serif text-[12px] italic text-amber-100/80">
            «{VERSO_DUELO.text}» <span className="not-italic font-semibold text-amber-300">{VERSO_DUELO.ref}</span>
          </p>
          <div className="grid gap-2 pt-1">
            {d.bot ? (
              <button type="button" className="sabio-boton w-full" onClick={() => void revancha()} data-testid="sabio-duelo-otra-practica">
                🤖 Otra práctica · <Ico e={NIVELES_BOT[d.bot].icono} /> {NIVELES_BOT[d.bot].nombre}
              </button>
            ) : (
              !fin.meFui && (
                <button type="button" className="sabio-boton w-full" onClick={() => void revancha()} data-testid="sabio-duelo-revancha">
                  ⚔️ Pedir la revancha a {rival}
                </button>
              )
            )}
            <button type="button" className="w-full rounded-xl bg-white/10 py-2.5 text-sm font-bold hover:bg-white/20" onClick={onSalir} data-testid="sabio-duelo-volver">
              Volver a la sala de los duelos
            </button>
          </div>
        </div>
      )}
      {aviso && <p className="rounded-xl bg-red-950/70 px-3 py-2 text-center text-xs">{aviso}</p>}
      {!terminado &&
        (salir ? (
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-white/5 p-2 text-xs">
            <p className="col-span-2 text-center">{d.bot ? "Si sales ahora, la práctica termina sin gozo. ¿Seguro?" : "Si sales ahora, pierdes el duelo. ¿Seguro?"}</p>
            <button type="button" className="rounded-xl bg-red-800/80 py-2 font-bold" onClick={() => void dejar()} data-testid="sabio-duelo-salir-si">
              Sí, salgo
            </button>
            <button type="button" className="rounded-xl bg-white/10 py-2 font-bold" onClick={() => setSalir(false)}>
              Sigo en el duelo
            </button>
          </div>
        ) : (
          <button type="button" className="w-full rounded-xl bg-white/5 py-2 text-xs font-bold text-amber-100/80 hover:bg-white/10" onClick={() => setSalir(true)} data-testid="sabio-duelo-salir">
            Salir del duelo
          </button>
        ))}
    </div>
  );
}

function Lado({ nombre, detalle, icono, puntos, listo, derecha }: { nombre: string; detalle: string; icono: string; puntos: number; listo: boolean; derecha?: boolean }) {
  return (
    <div className={`min-w-0 rounded-2xl bg-black/30 px-2.5 py-2 ${derecha ? "text-right" : ""}`} title={detalle}>
      <p className={`flex items-center gap-1 truncate text-[12px] font-black ${derecha ? "justify-end" : ""}`}>
        <span aria-hidden="true"><Ico e={icono} /></span> <span className="truncate">{nombre}</span>
        {listo && <span className="text-emerald-300" aria-label="ya respondió">✓</span>}
      </p>
      <p className="font-serif text-xl font-black tabular-nums text-amber-200">{miles(puntos)}</p>
    </div>
  );
}
