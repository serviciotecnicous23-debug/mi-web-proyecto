/**
 * El aula (Jerusalén en línea): la pantalla de la clase, a pantalla completa sobre el aula 3D (aula/escena.ts). El
 * maestro habla en su burbuja, la pregunta se escribe en el gran rollo y quien estudia toca la opción en el rollo de
 * abajo; el reloj corre, los compañeros reaccionan y al final sale la nota con su medalla. Las clases están en
 * aula/clases.ts (la sección de un estudio, su examen final y la cátedra del maestro) y el menú «¿Qué aprendemos
 * hoy?» abre cada una. Las reglas siguen en el servidor: aquí no se sabe ninguna respuesta antes de tiempo.
 */
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, Check, ChevronDown, GraduationCap, Loader2, Lock, ScrollText, Volume2, VolumeX, X } from "lucide-react";
import { AULAS, aulaDeEstudio, type AulaId, type MaestroAula } from "@shared/aula";
import { CATEDRAS, CATEDRA_POR_DIA } from "@shared/catedras";
import { CAMINOS_ESTUDIO, ESTUDIOS, EXAMEN_INTENTOS, EXAMEN_PREGUNTAS, type CaminoEstudio, type EstudiosEstado, type MiEstudio } from "@shared/estudios";
import type { Camino } from "@shared/caminos";
import { CiudadCtx } from "./CiudadUI";
import { Portrait } from "./Portrait";
import { Medalla } from "./medalla";
import { gameStore } from "./store";
import { avisarMisiones } from "./online";
import { servidoReciente } from "./servido";
import { Aula3D } from "./aula/Aula3D";
import type { AulaEscena } from "./aula/escena";
import { AulaCerrada, Director, type VistaClase } from "./aula/director";
import { api, claseCatedra, claseExamen, claseSeccion, type PedidoAula, type Siguiente } from "./aula/clases";
import { sonidoAula } from "./aula/aula-sonido";

const LETRAS = ["A", "B", "C", "D", "E"];

/** ¿La pantalla es más alta que ancha? (el panel de abajo tapa más del aula). */
function useVertical(): boolean {
  const [v, setV] = useState(() => (typeof window !== "undefined" ? window.innerHeight > window.innerWidth * 1.05 : false));
  useEffect(() => {
    const f = () => setV(window.innerHeight > window.innerWidth * 1.05);
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return v;
}

/** Quién estudia: el personaje con el que se juega (de la ciudad o, si no, del estado de Jerusalén). */
function useQuien(): { nombre: string; camino: Camino; personajeId: number | null } | null {
  const { estado } = useContext(CiudadCtx);
  const [otro, setOtro] = useState<{ nombre: string; camino: Camino; personajeId: number | null } | null>(null);
  useEffect(() => {
    if (estado) return;
    let vivo = true;
    void api<{ personaje: { id: number; nombre: string; camino: Camino } | null }>("/estado").then((r) => {
      if (vivo && r.ok && r.data?.personaje) setOtro({ nombre: r.data.personaje.nombre, camino: r.data.personaje.camino, personajeId: r.data.personaje.id });
    });
    return () => {
      vivo = false;
    };
  }, [estado]);
  if (estado) return { nombre: estado.yo.nombre, camino: estado.yo.camino, personajeId: estado.yo.personajeId ?? null };
  return otro;
}

export function AulaView({ aula: aulaId, pedido: inicial }: { aula: AulaId; pedido?: PedidoAula }) {
  const def = AULAS[aulaId] ?? AULAS.escuela;
  const { city } = useContext(CiudadCtx);
  const quien = useQuien();
  const vertical = useVertical();
  const [pedido, setPedido] = useState<PedidoAula>(inicial ?? { que: "menu" });
  const [vista, setVista] = useState<VistaClase | null>(null);
  const [hay3d, setHay3d] = useState(false);
  const [conSonido, setConSonido] = useState(sonidoAula.activo());
  const [estudios, setEstudios] = useState<EstudiosEstado | null>(null);
  const escena = useRef<AulaEscena | null>(null);
  const director = useRef<Director | null>(null);
  const maestro: MaestroAula = pedido.que === "catedra" ? def.catedra.maestro : def.maestro;

  // la campanilla al entrar y el murmullo de los compañeros mientras se está en el aula
  useEffect(() => {
    sonidoAula.campana();
    const parar = sonidoAula.murmullo(0.8);
    return () => parar();
  }, []);

  const recargarEstudios = useCallback(() => {
    void api<EstudiosEstado>("/estudios").then((r) => r.ok && r.data && setEstudios(r.data));
  }, []);
  useEffect(() => recargarEstudios(), [recargarEstudios]);

  const salir = useCallback(() => {
    director.current?.cerrar();
    gameStore.close();
  }, []);

  // cada clase es un guion con su propio director; al cambiar de clase (o al cerrar), el anterior se corta
  useEffect(() => {
    if (!quien) return;
    const d = new Director(maestro.id, quien.nombre);
    d.escena = escena.current;
    if (import.meta.env.DEV) (window as unknown as { __aulaDirector?: Director }).__aulaDirector = d;
    director.current = d;
    const quitar = d.escuchar(setVista);
    const seguir = (s: Siguiente) => {
      if (d.cerrado) return;
      if (s.que === "salir") salir();
      else setPedido(s);
    };
    const avisar = (t: string, tono: "gold" | "info") => gameStore.toast(t, tono);
    let guion: Promise<Siguiente> | null = null;
    if (pedido.que === "menu") {
      d.limpiar();
      d.progreso(null);
      escena.current?.setFase("menu");
      escena.current?.mostrar({ k: "titulo", titulo: def.nombre, sub: def.lugar.replace(/^./, (x) => x.toUpperCase()), verso: def.verso }, true);
    } else if (pedido.que === "seccion") {
      const mio = estudios?.mios.find((m) => m.id === pedido.estudio);
      guion = claseSeccion(d, {
        estudioId: pedido.estudio,
        seccionId: pedido.seccion,
        hecha: !!mio?.secciones.includes(pedido.seccion),
        estado: estudios,
        alGuardar: setEstudios,
        alAviso: avisar,
        alMisiones: (m) => avisarMisiones(m as never),
      });
    } else if (pedido.que === "examen") {
      guion = claseExamen(d, { estudioId: pedido.estudio, alGuardar: setEstudios, alAviso: avisar });
    } else if (pedido.que === "catedra") {
      guion = claseCatedra(d, { area: pedido.area, pista: servidoReciente(quien.personajeId ?? undefined), alGozo: (n) => city?.ponerGozo(n), alAviso: avisar });
    }
    guion
      ?.then(seguir)
      .catch((err) => {
        if (err instanceof AulaCerrada) return;
        console.error("[aula] la clase se cortó:", err);
        d.error("Algo salió mal en la clase. Vuelve a intentarlo.");
      });
    return () => {
      quitar();
      d.cerrar();
    };
    // la clase empieza cuando cambia lo pedido (no cuando llegan los estudios)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pedido, quien?.nombre]);

  // teclas: 1-4 (o A-D) eligen, Enter o espacio siguen
  useEffect(() => {
    const f = (ev: KeyboardEvent) => {
      const d = director.current;
      if (!d || ev.altKey || ev.ctrlKey || ev.metaKey) return;
      const k = ev.key.toLowerCase();
      const i = "1234".indexOf(k) >= 0 ? "1234".indexOf(k) : "abcd".indexOf(k);
      if (i >= 0 && d.vista.pregunta && !d.vista.pregunta.bloqueada) {
        d.elegir(i);
        ev.preventDefault();
      } else if ((k === "enter" || k === " ") && d.vista.sigue) {
        d.seguir();
        ev.preventDefault();
      } else if (k === "escape") salir();
    };
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, [salir]);

  const enClase = pedido.que !== "menu";
  const foco = vertical ? (enClase ? 0.26 : 0.3) : enClase ? 0.38 : 0.42;
  const dice = vista?.dice ?? null;
  const tonoLuz = dice?.tono === "suspenso" ? "aula-oscuro" : "";

  return (
    <div
      className={`aula-escena pointer-events-auto relative flex h-full w-full flex-col overflow-hidden text-amber-50 ${tonoLuz}`}
      style={{ paddingTop: "var(--tpl-st, 0px)", paddingBottom: "var(--tpl-sb, 0px)", paddingLeft: "var(--tpl-sl, 0px)", paddingRight: "var(--tpl-sr, 0px)" }}
      data-testid="aula"
      data-aula={def.id}
    >
      <style>{ESTILOS}</style>
      <Aula3D
        aula={def}
        maestro={maestro}
        foco={foco}
        onListo={(e) => {
          escena.current = e;
          if (director.current) director.current.escena = e;
          setHay3d(!!e);
          if (e && pedido.que === "menu") e.setFase("llegada");
        }}
      />
      {!hay3d && <div className="aula-fondo pointer-events-none absolute inset-0" />}
      {dice?.tono === "suspenso" && <div className="aula-vineta pointer-events-none absolute inset-0" />}
      {dice?.tono === "bien" && <div key={dice.n} className="aula-destello pointer-events-none absolute inset-0" />}

      {/* la cabecera: el aula, su maestro, lo que se está estudiando y los botones */}
      <div className="relative z-10 flex items-center justify-between gap-2 px-3 pt-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="aula-sello flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg">{def.id === "camara" ? "🕯️" : def.id === "palacio" ? "👑" : "📜"}</span>
          <div className="min-w-0">
            <p className="aula-titulo truncate font-serif text-[17px] font-black leading-tight" data-testid="aula-titulo">
              {def.nombre}
            </p>
            <p className="truncate text-[11px] font-semibold text-amber-100/80" data-testid="aula-progreso">
              {vista?.progreso ?? `${maestro.titulo} · ${def.lugar}`}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 gap-1.5">
          {enClase && (
            <button type="button" className="aula-boton-redondo" onClick={() => setPedido({ que: "menu" })} aria-label="Volver a los rollos del aula" data-testid="aula-menu-boton">
              <ScrollText className="h-4 w-4" />
            </button>
          )}
          <button type="button" className="aula-boton-redondo" onClick={() => setConSonido(sonidoAula.alternar())} aria-label={conSonido ? "Silenciar el aula" : "Activar el sonido"} data-testid="aula-sonido">
            {conSonido ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
          <button type="button" className="aula-boton-redondo" onClick={salir} aria-label="Salir del aula" data-testid="aula-cerrar">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto px-2.5 pb-2.5 sm:px-4">
        {!quien && (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-amber-300" />
          </div>
        )}
        {quien && pedido.que === "menu" && (
          <Menu
            def={def}
            camino={quien.camino}
            nombre={quien.nombre}
            estudios={estudios}
            abrir={(p) => {
              sonidoAula.pagina();
              const est = p.que === "seccion" || p.que === "examen" ? ESTUDIOS.find((x) => x.id === p.estudio) : null;
              const otra = est && est.camino !== "comun" ? aulaDeEstudio(est.camino, quien.camino) : null;
              if (otra && otra !== def.id) {
                // ese estudio se da en otra aula, con su maestro: se va para allá
                gameStore.pushFront({ kind: "aula", aula: otra, pedido: p });
                salir();
                return;
              }
              setPedido(p);
            }}
          />
        )}
        {quien && enClase && vista && <PanelClase vista={vista} director={director.current} maestroNombre={maestro.nombre} />}
      </div>
    </div>
  );
}

// ================================================================ el panel de la clase
function PanelClase({ vista, director, maestroNombre }: { vista: VistaClase; director: Director | null; maestroNombre: string }) {
  const p = vista.pregunta;
  return (
    <div className="aula-panel aula-alto mx-auto mt-auto w-full max-w-3xl space-y-2 overflow-y-auto rounded-t-3xl px-2 pb-1 pt-2" data-testid="aula-panel">
      {vista.dice && <Burbuja dice={vista.dice} sigue={vista.sigue} onSigue={() => director?.seguir()} nombre={maestroNombre} />}
      {vista.error && (
        <p className="rounded-xl bg-red-950/70 px-3 py-2 text-[13px] font-semibold text-red-100" data-testid="aula-error">
          {vista.error}
        </p>
      )}
      {vista.cargando && (
        <p className="flex items-center justify-center gap-2 py-1 text-xs text-amber-100/80">
          <Loader2 className="h-4 w-4 animate-spin" /> Un momento…
        </p>
      )}
      {p && <RolloOpciones p={p} reloj={vista.reloj} onElegir={(i) => director?.elegir(i)} repetida={vista.dice?.texto === p.texto} />}
      {vista.nota && <Nota nota={vista.nota} />}
      {vista.acciones.length > 0 && (
        <div className="grid gap-1.5 sm:grid-cols-2" data-testid="aula-acciones">
          {vista.acciones.map((a) => (
            <button
              key={a.id}
              type="button"
              disabled={a.disabled}
              onClick={() => director?.accion(a.id)}
              className={a.primaria ? "aula-boton-oro" : "aula-boton-claro"}
              data-testid={`aula-accion-${a.id}`}
            >
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** El texto que se va escribiendo (y que se completa al tocarlo). */
function useEscribe(texto: string, clave: number): [string, boolean, () => void] {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    const inicio = performance.now();
    let raf = 0;
    const paso = () => {
      const k = Math.min(texto.length, Math.floor(((performance.now() - inicio) / 1000) * 62));
      setN(k);
      if (k < texto.length) raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    // con el panel oculto no hay cuadros: el texto completo después de un rato
    const t = window.setTimeout(() => setN(texto.length), Math.min(6000, 400 + texto.length * 20));
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [texto, clave]);
  return [texto.slice(0, n), n >= texto.length, () => setN(texto.length)];
}

function Burbuja({ dice, sigue, onSigue, nombre }: { dice: NonNullable<VistaClase["dice"]>; sigue: string | null; onSigue: () => void; nombre: string }) {
  const [visto, completo, completar] = useEscribe(dice.texto, dice.n);
  const tono =
    dice.tono === "bien" ? "aula-burbuja-bien" : dice.tono === "mal" ? "aula-burbuja-mal" : dice.tono === "suspenso" ? "aula-burbuja-suspenso" : dice.tono === "verso" ? "aula-burbuja-verso" : "";
  return (
    <div className="flex items-start gap-2.5" data-testid="aula-dice" data-tono={dice.tono}>
      <div className="aula-retrato shrink-0">
        <Portrait who={dice.quien} size={46} />
      </div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => (completo ? sigue && onSigue() : completar())}
        onKeyDown={(e) => {
          if (e.key === "Enter" && completo && sigue) onSigue();
        }}
        className={`aula-burbuja relative min-w-0 flex-1 cursor-pointer rounded-2xl rounded-tl-sm px-3 py-2 ${tono}`}
      >
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#8f2a17]">{nombre}</p>
        <p className={`text-[14px] leading-snug text-[#2a1a10] ${dice.tono === "verso" ? "font-serif italic" : "font-medium"}`} data-testid="aula-dice-texto">
          {visto}
          {!completo && <span className="aula-cursor">▍</span>}
          {completo && dice.ref && <span className="ml-1 whitespace-nowrap font-sans text-[11.5px] font-black not-italic text-[#8f2a17]">({dice.ref})</span>}
        </p>
        {sigue && (
          <div className="mt-1.5 flex justify-end">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (!completo) completar();
                else onSigue();
              }}
              className="aula-sigue"
              data-testid="aula-sigue"
            >
              {completo ? `${sigue} ▸` : "…"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Reloj({ total, hasta }: { total: number; hasta: number }) {
  const [restan, setRestan] = useState(() => Math.max(0, Math.ceil((hasta - Date.now()) / 1000)));
  useEffect(() => {
    let antes = -1;
    const f = () => {
      const r = Math.max(0, Math.ceil((hasta - Date.now()) / 1000));
      setRestan(r);
      if (r !== antes && r <= 10 && r > 0) sonidoAula.tic(r <= 5);
      antes = r;
    };
    f();
    const t = window.setInterval(f, 250);
    return () => window.clearInterval(t);
  }, [hasta]);
  const r = 17;
  const c = 2 * Math.PI * r;
  const frac = Math.max(0, Math.min(1, restan / Math.max(1, total)));
  const color = restan <= 5 ? "#b22222" : restan <= 10 ? "#c9861a" : "#2e6b45";
  return (
    <div className={`relative h-11 w-11 shrink-0 ${restan <= 5 ? "aula-latido" : ""}`} aria-label={`Quedan ${restan} segundos`} data-testid="aula-reloj">
      <svg viewBox="0 0 44 44" className="h-11 w-11 -rotate-90">
        <circle cx="22" cy="22" r={r} fill="#f6ead0" stroke="rgba(90,55,20,.25)" strokeWidth="4" />
        <circle cx="22" cy="22" r={r} fill="none" stroke={color} strokeWidth="4" strokeDasharray={c} strokeDashoffset={c * (1 - frac)} strokeLinecap="round" style={{ transition: "stroke-dashoffset .25s linear" }} />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[13px] font-black tabular-nums" style={{ color }}>
        {restan}
      </span>
    </div>
  );
}

/** El rollo de abajo: la pregunta y sus opciones, para tocar. */
function RolloOpciones({ p, reloj, onElegir, repetida }: { p: NonNullable<VistaClase["pregunta"]>; reloj: VistaClase["reloj"]; onElegir: (i: number) => void; repetida: boolean }) {
  // las opciones cortas van de a dos también en el teléfono
  const cortas = p.opciones.every((o) => o.length <= 22);
  return (
    <div className="aula-rollo relative" data-testid="aula-rollo">
      <div className="aula-vara aula-vara-arriba" />
      <div className="relative px-3.5 pb-2.5 pt-3 text-[#2a1a10]">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            {p.etiqueta && <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#8f2a17]">{p.etiqueta}</p>}
            {/* (si el maestro la está diciendo en su burbuja, en el teléfono no se repite) */}
            <p className={`font-serif text-[15px] font-bold leading-snug sm:block sm:text-[16px] ${repetida ? "hidden" : ""}`} data-testid="aula-pregunta">
              {p.texto}
            </p>
          </div>
          {reloj && <Reloj total={reloj.total} hasta={reloj.hasta} />}
        </div>
        <div className={`mt-2 grid gap-1.5 ${cortas ? "grid-cols-2" : "sm:grid-cols-2"}`}>
          {p.opciones.map((o, i) => {
            const marca = p.correcta === i ? "bien" : p.mala === i ? "mal" : p.tachadas.includes(i) ? "tachada" : p.elegida === i ? "elegida" : "";
            return (
              <button
                key={`${i}-${o}`}
                type="button"
                disabled={p.bloqueada || p.tachadas.includes(i)}
                onClick={() => onElegir(i)}
                className={`aula-op ${marca ? `aula-op-${marca}` : ""}`}
                data-testid={`aula-opcion-${i}`}
                data-marca={marca || undefined}
              >
                <span className="aula-letra">{marca === "bien" ? <Check className="h-3.5 w-3.5" /> : marca === "mal" ? <X className="h-3.5 w-3.5" /> : LETRAS[i]}</span>
                <span className="min-w-0 flex-1 text-left">{o}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="aula-vara aula-vara-abajo" />
    </div>
  );
}

function Nota({ nota }: { nota: NonNullable<VistaClase["nota"]> }) {
  const icono = nota.metal === 3 ? "⭐" : nota.metal === 2 ? "🎓" : nota.metal === 1 ? "📜" : "📖";
  return (
    <div className="aula-rollo aula-nota relative" data-testid="aula-nota" data-metal={nota.metal}>
      <div className="aula-vara aula-vara-arriba" />
      <div className="flex items-center gap-3 px-4 pb-3 pt-3.5 text-[#2a1a10]">
        <span className={nota.metal ? "aula-medalla-sale" : ""}>
          <Medalla icono={icono} metal={nota.metal} size={70} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-serif text-[22px] font-black leading-tight text-[#8f2a17]" data-testid="aula-nota-titulo">
            {nota.titulo}
          </p>
          {nota.de > 0 && (
            <p className="text-[13px] font-black tabular-nums" data-testid="aula-nota-cuenta">
              {nota.aciertos} de {nota.de}
            </p>
          )}
          {nota.sub && <p className="text-[12.5px] font-semibold leading-snug text-[#5a3a1a]">{nota.sub}</p>}
          {nota.lineas.map((l) => (
            <p key={l} className="text-[11.5px] leading-snug text-[#6b4a2a]">
              {l}
            </p>
          ))}
        </div>
      </div>
      <div className="aula-vara aula-vara-abajo" />
    </div>
  );
}

// ================================================================ el menú: ¿qué aprendemos hoy?
function Menu({ def, camino, nombre, estudios, abrir }: { def: (typeof AULAS)[AulaId]; camino: Camino; nombre: string; estudios: EstudiosEstado | null; abrir: (p: PedidoAula) => void }) {
  const [abierto, setAbierto] = useState<string | null>(null);
  const [todos, setTodos] = useState(false);
  const deEsta = camino === def.camino;
  const cat = CATEDRAS[def.catedra.area];
  // primero los estudios de esta aula y los de todos; los de los otros caminos, plegados
  const grupos = useMemo(() => {
    const propio: CaminoEstudio = def.camino;
    const orden: CaminoEstudio[] = [propio, "comun", ...(["sacerdocio", "profecia", "realeza"] as CaminoEstudio[]).filter((c) => c !== propio)];
    return orden.map((c) => ({ c, lista: ESTUDIOS.filter((e) => e.camino === c), otro: c !== propio && c !== "comun" })).filter((g) => g.lista.length);
  }, [def.camino]);
  const mio = (id: string): MiEstudio | undefined => estudios?.mios.find((m) => m.id === id);
  const visibles = grupos.filter((g) => todos || !g.otro);
  return (
    <div className="aula-panel aula-alto mx-auto mt-auto w-full max-w-3xl space-y-2.5 overflow-y-auto rounded-t-3xl px-2.5 pb-2 pt-2.5" data-testid="aula-menu">
      <div className="flex items-start gap-2.5">
        <div className="aula-retrato shrink-0">
          <Portrait who={def.maestro.id} size={46} />
        </div>
        <div className="aula-burbuja min-w-0 flex-1 rounded-2xl rounded-tl-sm px-3 py-2">
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#8f2a17]">{def.maestro.nombre}</p>
          <p className="text-[14px] font-medium leading-snug text-[#2a1a10]">
            {nombre ? `${nombre}, ` : ""}¿qué aprendemos hoy? Elige una sección para la clase, o el examen final cuando las termines.
            {deEsta ? ` ${def.catedra.maestro.nombre} también da su cátedra.` : ""}
          </p>
        </div>
      </div>
      {deEsta && (
        <button type="button" className="aula-tarjeta aula-tarjeta-catedra flex w-full items-center gap-3 text-left" onClick={() => abrir({ que: "catedra", area: def.catedra.area })} data-testid="aula-catedra">
          <Portrait who={def.catedra.maestro.id} size={38} />
          <span className="min-w-0 flex-1">
            <span className="block font-serif text-[15px] font-black text-[#8f2a17]">
              {cat.icono} {cat.nombre}
            </span>
            <span className="block text-[11.5px] font-semibold text-[#5a3a1a]">
              Con {def.catedra.maestro.nombre}: hasta {CATEDRA_POR_DIA} lecciones por día en tu camino, cada una con su pregunta.
            </span>
          </span>
          <BookOpen className="h-5 w-5 shrink-0 text-[#8f2a17]" />
        </button>
      )}
      {!estudios && (
        <p className="flex items-center gap-2 px-1 text-xs text-amber-100/80">
          <Loader2 className="h-4 w-4 animate-spin" /> Trayendo tus rollos…
        </p>
      )}
      {estudios &&
        visibles.map(({ c, lista }) => (
          <div key={c} className="space-y-1.5">
            <p className="px-1 text-[11px] font-black uppercase tracking-[0.14em] text-amber-200/90">
              {CAMINOS_ESTUDIO[c].icono} {c === "comun" ? "Para todos" : CAMINOS_ESTUDIO[c].nombre}
            </p>
            {lista.map((e) => {
              const m = mio(e.id);
              const bloqueado = !!e.requiere && !mio(e.requiere)?.aprobado;
              const hechas = m?.secciones.length ?? 0;
              const ver = abierto === e.id;
              const dondeSeDa = e.camino === "comun" ? def.id : aulaDeEstudio(e.camino, camino);
              return (
                <div key={e.id} className="aula-tarjeta" data-testid={`aula-estudio-${e.id}`}>
                  <button type="button" className="flex w-full items-center gap-3 text-left" onClick={() => setAbierto(ver ? null : e.id)} aria-expanded={ver}>
                    <span className="text-2xl">{e.icono}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-serif text-[15px] font-black leading-tight text-[#2a1a10]">{e.titulo}</span>
                      <span className="block text-[11.5px] font-semibold text-[#6b4a2a]">
                        {m?.aprobado
                          ? `✓ Aprobado · ${m.perfecto ? "⭐ 6 de 6" : `${m.mejor} de ${EXAMEN_PREGUNTAS}`}`
                          : bloqueado
                            ? `🔒 Primero aprueba otro estudio`
                            : `${hechas} de ${e.secciones.length} secciones${m?.puedeExamen ? " · examen listo" : ""}`}
                        {dondeSeDa !== def.id ? ` · se da en ${AULAS[dondeSeDa].lugar}` : ""}
                      </span>
                    </span>
                    {bloqueado ? <Lock className="h-4 w-4 shrink-0 text-[#8a6a4a]" /> : m?.aprobado ? <Check className="h-5 w-5 shrink-0 text-emerald-700" /> : <ChevronDown className={`h-4 w-4 shrink-0 text-[#8a6a4a] transition ${ver ? "rotate-180" : ""}`} />}
                  </button>
                  {ver && (
                    <div className="mt-2 space-y-1.5 border-t border-[#8f2a17]/20 pt-2">
                      <p className="text-[12px] leading-snug text-[#5a3a1a]">{e.resumen}</p>
                      {e.secciones.map((s, i) => {
                        const hecha = !!m?.secciones.includes(s.id);
                        return (
                          <button
                            key={s.id}
                            type="button"
                            disabled={bloqueado}
                            onClick={() => abrir({ que: "seccion", estudio: e.id, seccion: s.id })}
                            className="flex w-full items-center gap-2.5 rounded-xl bg-white/45 px-2.5 py-1.5 text-left hover:bg-white/70 disabled:opacity-50"
                            data-testid={`aula-seccion-${s.id}`}
                          >
                            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-black ${hecha ? "bg-emerald-600 text-white" : "bg-[#8f2a17] text-amber-50"}`}>{hecha ? <Check className="h-3.5 w-3.5" /> : i + 1}</span>
                            <span className="min-w-0 flex-1 text-[13px] font-bold text-[#2a1a10]">{s.titulo}</span>
                            <span className="text-[11px] font-black text-[#8f2a17]">{hecha ? "Repasar" : "A clase ▸"}</span>
                          </button>
                        );
                      })}
                      {!m?.perfecto && (
                        <button
                          type="button"
                          disabled={!m?.puedeExamen}
                          onClick={() => abrir({ que: "examen", estudio: e.id })}
                          className="aula-boton-oro w-full"
                          data-testid={`aula-examen-${e.id}`}
                        >
                          <GraduationCap className="-mt-0.5 mr-1 inline h-4 w-4" />
                          {m?.esperaExamen
                            ? `Otro intento en ${m.esperaExamen > 90 ? `${Math.ceil(m.esperaExamen / 60)} min` : `${m.esperaExamen} s`}`
                            : m?.puedeExamen
                              ? m.aprobado
                                ? `Buscar el 6 de 6 (quedan ${Math.max(0, EXAMEN_INTENTOS - m.intentos)} intentos)`
                                : m.intentos
                                  ? `Examen final: intento ${m.intentos + 1}`
                                  : "🎓 Examen final en el aula"
                              : "Examen final (termina las secciones)"}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      {estudios && grupos.some((g) => g.otro) && (
        <button type="button" className="aula-boton-claro w-full" onClick={() => setTodos((v) => !v)} data-testid="aula-otros-rollos">
          {todos ? "Ocultar los rollos de los otros caminos" : "Ver los rollos de los otros caminos"}
        </button>
      )}
    </div>
  );
}

const ESTILOS = `
.aula-escena{background:#1a120c}
.aula-fondo{background:radial-gradient(ellipse at 30% 10%,rgba(255,214,150,.35),transparent 55%),linear-gradient(180deg,#5a3a22 0%,#2a1a10 55%,#140c06 100%)}
.aula-titulo{background:linear-gradient(180deg,#fff6d6 0%,#f2c94c 60%,#c08a1a 100%);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 2px 5px rgba(0,0,0,.55))}
.aula-sello{background:radial-gradient(circle at 35% 30%,#fff3c4,#e2b33c 55%,#8a5a0c);box-shadow:0 2px 8px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.6)}
.aula-boton-redondo{border-radius:999px;padding:.5rem;background:rgba(20,12,6,.55);border:1px solid rgba(242,201,76,.35);color:#fde9b0;backdrop-filter:blur(3px)}
.aula-boton-redondo:hover{background:rgba(60,36,16,.7)}
.aula-alto{max-height:60%;overscroll-behavior:contain}
@media (max-height:520px){.aula-alto{max-height:72%}}
.aula-panel{background:linear-gradient(180deg,rgba(20,12,6,.08) 0%,rgba(20,12,6,.72) 12%,rgba(20,12,6,.9) 100%);box-shadow:0 -16px 36px rgba(20,12,6,.45)}
.aula-burbuja{background:linear-gradient(180deg,#fffaf0,#f6ecd6);border:1px solid rgba(143,42,23,.35);box-shadow:0 6px 18px rgba(0,0,0,.35);animation:aulaSale .28s ease-out}
.aula-burbuja-bien{background:linear-gradient(180deg,#f3fff6,#dff4e5);border-color:rgba(46,139,87,.65);box-shadow:0 0 0 3px rgba(46,139,87,.18),0 6px 18px rgba(0,0,0,.35)}
.aula-burbuja-mal{background:linear-gradient(180deg,#fff8f2,#f8e6d8);border-color:rgba(178,34,34,.45)}
.aula-burbuja-suspenso{background:linear-gradient(180deg,#eef0ff,#d9ddf5);border-color:rgba(70,80,160,.6);animation:aulaLatido 1s ease-in-out infinite}
.aula-burbuja-verso{background:linear-gradient(180deg,#fff7e2,#f3e2b8);border-color:rgba(201,162,58,.8)}
.aula-retrato{filter:drop-shadow(0 3px 6px rgba(0,0,0,.5))}
.aula-cursor{display:inline-block;margin-left:1px;color:#8f2a17;animation:aulaCursor .7s steps(2) infinite}
.aula-sigue{border-radius:999px;padding:.32rem .85rem;font-size:12.5px;font-weight:900;color:#fff8e6;background:linear-gradient(180deg,#a8442f,#7a2414);box-shadow:0 3px 10px rgba(122,36,20,.4)}
.aula-rollo{background:linear-gradient(180deg,#f4e7c6,#ead5a3 60%,#e2c993);border-radius:.6rem;box-shadow:0 10px 28px rgba(0,0,0,.45),inset 0 0 26px rgba(120,80,30,.25);margin:10px 4px;animation:aulaDesenrolla .45s ease-out}
.aula-vara{position:absolute;left:-6px;right:-6px;height:13px;border-radius:999px;background:linear-gradient(180deg,#9a6a3a,#5a3a1e 60%,#3a2412);box-shadow:0 2px 5px rgba(0,0,0,.4)}
.aula-vara::before,.aula-vara::after{content:"";position:absolute;top:-3px;width:19px;height:19px;border-radius:999px;background:radial-gradient(circle at 35% 30%,#fff3c4,#e2b33c 55%,#8a5a0c)}
.aula-vara::before{left:-9px}.aula-vara::after{right:-9px}
.aula-vara-arriba{top:-7px}.aula-vara-abajo{bottom:-7px}
.aula-op{display:flex;align-items:center;gap:.55rem;width:100%;border-radius:.8rem;padding:.5rem .65rem;font-size:13.5px;font-weight:700;line-height:1.25;color:#2a1a10;background:rgba(255,252,242,.72);border:1.5px solid rgba(143,42,23,.28);transition:transform .12s,background .15s,border-color .15s}
.aula-op:hover:not(:disabled){background:#fffdf6;border-color:rgba(143,42,23,.6);transform:translateY(-1px)}
.aula-op:disabled{cursor:default}
.aula-letra{display:inline-flex;align-items:center;justify-content:center;width:1.55rem;height:1.55rem;flex-shrink:0;border-radius:999px;font-size:12px;font-weight:900;color:#fff8e6;background:#8f2a17}
.aula-op-elegida{background:linear-gradient(180deg,#ffe7a8,#f3c55a);border-color:#c9861a;animation:aulaPulso 1s ease-in-out infinite}
.aula-op-elegida .aula-letra{background:#c9861a}
.aula-op-bien{background:linear-gradient(180deg,#d9f7e3,#a8e6bd);border-color:#2e8b57;animation:aulaBien .9s ease-in-out 2}
.aula-op-bien .aula-letra{background:#2e8b57}
.aula-op-mal{background:linear-gradient(180deg,#fde2dc,#f5b9ad);border-color:#b22222}
.aula-op-mal .aula-letra{background:#b22222}
@media (max-width:420px){.aula-op{padding:.42rem .55rem;font-size:13px}.aula-letra{width:1.35rem;height:1.35rem;font-size:11px}}
.aula-op-tachada{opacity:.5;text-decoration:line-through;text-decoration-color:#8f2a17}
.aula-boton-oro{border-radius:.85rem;padding:.62rem .9rem;font-weight:900;font-size:13.5px;color:#2a1a00;background:linear-gradient(180deg,#ffe28a,#e0a91c);box-shadow:0 6px 16px rgba(224,169,28,.3),inset 0 1px 0 rgba(255,255,255,.6)}
.aula-boton-oro:disabled{opacity:.55}
.aula-boton-claro{border-radius:.85rem;padding:.62rem .9rem;font-weight:800;font-size:13.5px;color:#fde9b0;background:rgba(255,240,200,.1);border:1px solid rgba(242,201,76,.35)}
.aula-boton-claro:hover{background:rgba(255,240,200,.18)}
.aula-tarjeta{border-radius:1rem;padding:.6rem .75rem;background:linear-gradient(180deg,#f6ead0,#ead6a8);border:1px solid rgba(143,42,23,.3);box-shadow:0 4px 14px rgba(0,0,0,.3)}
.aula-tarjeta-catedra{background:linear-gradient(180deg,#fff4d2,#f0d38a);border-color:rgba(201,134,26,.8)}
.aula-nota{animation:aulaDesenrolla .6s ease-out}
.aula-medalla-sale{display:inline-flex;animation:aulaMedalla .9s cubic-bezier(.2,1.6,.4,1) both}
.aula-latido{animation:aulaLatido .8s ease-in-out infinite}
.aula-vineta{background:radial-gradient(ellipse at 50% 35%,transparent 35%,rgba(5,6,20,.6) 100%);animation:aulaVineta 1.2s ease-out both}
.aula-destello{background:radial-gradient(circle at 50% 35%,rgba(255,226,140,.38),transparent 60%);animation:aulaDestello 1.3s ease-out forwards}
@keyframes aulaSale{from{opacity:0;transform:translateY(6px) scale(.98)}to{opacity:1;transform:none}}
@keyframes aulaDesenrolla{from{opacity:0;transform:scaleY(.6);transform-origin:top}to{opacity:1;transform:scaleY(1);transform-origin:top}}
@keyframes aulaPulso{0%,100%{box-shadow:0 0 0 rgba(243,197,90,0)}50%{box-shadow:0 0 16px rgba(243,197,90,.75)}}
@keyframes aulaBien{0%,100%{box-shadow:0 0 0 rgba(46,139,87,0)}50%{box-shadow:0 0 22px rgba(46,139,87,.75)}}
@keyframes aulaLatido{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}
@keyframes aulaCursor{to{visibility:hidden}}
@keyframes aulaMedalla{from{transform:scale(.2) rotate(-25deg);opacity:0}to{transform:none;opacity:1}}
@keyframes aulaVineta{from{opacity:0}to{opacity:1}}
@keyframes aulaDestello{from{opacity:1}to{opacity:0}}
@media (prefers-reduced-motion: reduce){.aula-burbuja,.aula-rollo,.aula-op-elegida,.aula-op-bien,.aula-latido,.aula-medalla-sale,.aula-destello,.aula-burbuja-suspenso{animation:none!important}}
`;
