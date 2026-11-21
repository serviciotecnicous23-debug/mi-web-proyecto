// La gestión del expediente de un alumno, para la Administración de la academia (server/academia-gestion.ts): el panel de
// cada materia (la nota por partes con sus ajustes, la convalidación, los exámenes con sus intentos y esperas, las
// lecciones y la inscripción) y las herramientas del alumno (estatus, tiempo extra, otra materia, mensaje e historial).
// Cada acción pide un motivo, que queda en el historial y le llega al alumno en la campana.
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  Award,
  BookOpen, CheckCircle2, ChevronDown, ClipboardCheck, Clock, Hourglass, ListChecks, Loader2, MessageSquare, PenLine, RotateCcw, Scale, Settings2, ShieldCheck,
  Timer, UserCheck, UserMinus, UserPlus, XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { AlumnoDetalle, ComponenteGestion, GestionMateria, PruebaGestion, ResultadoGestion } from "@shared/academia-direccion";
import {
  accionCierre, accionLeccion, accionPrueba, ajustarComponente, cambiarEstatusAlumno, cambiarTiempoExtra, convalidarMateria, escribirAlumno, inscripcionEnMateria,
  useGestionMateria, useHistorialAlumno, type AccionPrueba,
} from "./api";
import { fecha } from "./seguimiento";

/** Una acción por confirmar: su título, una nota si la pide y lo que hace al confirmar (con el motivo). */
type Pendiente = {
  titulo: string;
  detalle?: string;
  nota?: { min: number; max: number; inicial?: number; etiqueta: string };
  peligro?: boolean;
  confirmar: (motivo: string, nota: number | null) => Promise<ResultadoGestion>;
};

const APRUEBA = 70;
const VIA: Record<NonNullable<GestionMateria["via"]>, string> = { cursada: "cursándola", suficiencia: "por suficiencia", convalidada: "por convalidación" };
const ESTADO: Record<GestionMateria["estado"], string> = { "en-preparacion": "En preparación", disponible: "Sin inscribir", "en-curso": "En curso", aprobada: "Aprobada" };

/** «23 h 10 min», «12 min», «40 s». */
function duracion(seg: number): string {
  if (seg < 60) return `${seg} s`;
  const min = Math.ceil(seg / 60);
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const r = min % 60;
  return r ? `${h} h ${r} min` : `${h} h`;
}

/** La caja para confirmar una acción: la nota (si la pide), el motivo y confirmar. */
function CajaPendiente({ p, alCerrar, alTerminar }: { p: Pendiente; alCerrar: () => void; alTerminar: (r: ResultadoGestion) => void }) {
  const [motivo, setMotivo] = useState("");
  const [nota, setNota] = useState(p.nota?.inicial != null ? String(p.nota.inicial) : "");
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const caja = useRef<HTMLElement>(null);
  useEffect(() => {
    caja.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, []);
  const n = Number(nota);
  const notaOk = !p.nota || (nota.trim() !== "" && Number.isInteger(n) && n >= p.nota.min && n <= p.nota.max);
  const enviar = async () => {
    setOcupado(true);
    setError(null);
    try {
      alTerminar(await p.confirmar(motivo.trim(), p.nota ? n : null));
    } catch (e: any) {
      setError(e?.message ?? "No se pudo completar.");
    } finally {
      setOcupado(false);
    }
  };
  return (
    <section ref={caja} aria-label="Confirmar la acción" className={`rounded-xl border-2 ${p.peligro ? "border-red-500/60" : "border-orange-500/60"} bg-background p-4 space-y-3 shadow-lg`} data-testid="gestion-pendiente">
      <p className="font-semibold">{p.titulo}</p>
      {p.detalle && <p className="text-sm text-muted-foreground">{p.detalle}</p>}
      {p.nota && (
        <label className="text-sm block">
          {p.nota.etiqueta}
          <Input
            type="number"
            inputMode="numeric"
            min={p.nota.min}
            max={p.nota.max}
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            className="mt-1 h-10 w-28 text-[16px]"
            data-testid="gestion-nota"
          />
        </label>
      )}
      <label className="text-sm block">
        Motivo (queda en el historial y lo ve el alumno)
        <Textarea value={motivo} onChange={(e) => setMotivo(e.target.value)} rows={2} maxLength={500} className="mt-1 text-[16px]" autoFocus data-testid="gestion-motivo" />
      </label>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          className={p.peligro ? "bg-red-600 hover:bg-red-700 text-white" : "fire-btn-primary"}
          onClick={enviar}
          disabled={ocupado || motivo.trim().length < 8 || !notaOk}
          data-testid="gestion-confirmar"
        >
          {ocupado ? <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> Guardando…</> : "Confirmar"}
        </Button>
        <Button size="sm" variant="ghost" onClick={alCerrar} disabled={ocupado}>Cancelar</Button>
        {motivo.trim().length < 8 && <span className="text-xs text-muted-foreground self-center">El motivo pide al menos 8 letras.</span>}
      </div>
      {error && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
    </section>
  );
}

/** El estado de las acciones de una pantalla: la que está por confirmar y el aviso de la última. */
function useAcciones() {
  const qc = useQueryClient();
  const [pendiente, setPendiente] = useState<Pendiente | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const abrir = (p: Pendiente) => {
    setAviso(null);
    setPendiente(p);
  };
  const caja = pendiente ? (
    <CajaPendiente
      key={pendiente.titulo}
      p={pendiente}
      alCerrar={() => setPendiente(null)}
      alTerminar={(r) => {
        setPendiente(null);
        setAviso(r.mensaje);
        void qc.invalidateQueries({ queryKey: ["academia", "direccion"] });
      }}
    />
  ) : aviso ? (
    <p className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-emerald-800 dark:text-emerald-200 flex items-start gap-2" role="status" data-testid="gestion-aviso">
      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> <span>{aviso}</span>
    </p>
  ) : null;
  return { abrir, caja, ocupada: !!pendiente };
}

function Seccion({ icono: Icono, titulo, children, testid }: { icono: typeof BookOpen; titulo: string; children: ReactNode; testid?: string }) {
  return (
    <section className="space-y-2" data-testid={testid}>
      <h3 className="font-semibold flex items-center gap-2"><Icono className="w-4 h-4 text-orange-600" /> {titulo}</h3>
      {children}
    </section>
  );
}

// ---------------------------------------------------------------- el panel de una materia

function FilaComponente({ c, fija, alAjustar, alQuitar }: { c: ComponenteGestion; fija: boolean; alAjustar: () => void; alQuitar: () => void }) {
  const vale = c.ajuste ? c.ajuste.nota : c.calculado;
  return (
    <tr className="border-b border-border/60 last:border-0 align-top">
      <td className="py-2 pr-2">
        <span className="font-medium">{c.texto}</span>
        <span className="block text-xs text-muted-foreground">Pesa {c.peso} %</span>
        {c.ajuste && (
          <span className="block text-xs text-orange-700 dark:text-orange-300 mt-0.5">
            Ajustada por {c.ajuste.por} el {fecha(c.ajuste.fecha)}: «{c.ajuste.motivo}»
          </span>
        )}
      </td>
      <td className="py-2 px-2 text-right tabular-nums">{c.calculado}</td>
      <td className="py-2 px-2 text-right tabular-nums font-semibold">{vale}{c.ajuste && <span className="sr-only"> (ajustada)</span>}</td>
      <td className="py-2 pl-2 text-right">
        {!fija && (
          <span className="inline-flex flex-wrap justify-end gap-1">
            <Button size="sm" variant="outline" className="h-8" onClick={alAjustar} data-testid={`ajustar-${c.id}`}><PenLine className="w-3.5 h-3.5 mr-1" /> Ajustar</Button>
            {c.ajuste && <Button size="sm" variant="ghost" className="h-8" onClick={alQuitar} data-testid={`quitar-ajuste-${c.id}`}><RotateCcw className="w-3.5 h-3.5 mr-1" /> Quitar</Button>}
          </span>
        )}
      </td>
    </tr>
  );
}

/** El título con la primera letra en minúscula, sin tocar los nombres propios («del examen integral del Nivel 1»). */
const minuscula = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);

function TarjetaPrueba({ p, alAccion }: { p: PruebaGestion; alAccion: (accion: AccionPrueba, titulo: string, detalle: string, peligro?: boolean) => void }) {
  const tope = p.tope != null ? p.tope + p.extra : null;
  return (
    <li className="rounded-xl border border-border p-3 space-y-2" data-testid={`prueba-${p.tipo}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-medium">{p.titulo}</span>
        <span className="text-sm text-muted-foreground tabular-nums">
          {tope != null ? `${p.intentos} de ${tope} ${p.tipo === "breve" || p.tipo === "trabajo" ? "entregas" : "intentos"}` : `${p.intentos} ${p.intentos === 1 ? "intento" : "intentos"}`}
          {p.extra ? ` (${p.extra} de más)` : ""}
          {p.mejor != null ? ` · mejor ${p.mejor}` : ""}
        </span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {p.fallos > 0 && <span className="inline-flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> {p.fallos} {p.fallos === 1 ? "fallo" : "fallos"}</span>}
        {p.espera > 0 && <span className="inline-flex items-center gap-1 text-orange-700 dark:text-orange-300"><Hourglass className="w-3.5 h-3.5" /> Puede volver en {duracion(p.espera)}</span>}
        {p.pideRepaso && <span className="inline-flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> Pide volver a leer las lecciones</span>}
        {p.enCurso && <span className="inline-flex items-center gap-1 text-sky-700 dark:text-sky-300"><Clock className="w-3.5 h-3.5" /> Tiene un intento en curso</span>}
      </div>
      <div className="flex flex-wrap gap-2">
        {(p.tipo === "final" || p.tipo === "integral") && (p.espera > 0 || p.pideRepaso) && (
          <Button size="sm" variant="outline" className="h-8" onClick={() => alAccion("quitar-espera", `Quitar la espera del ${minuscula(p.titulo)}`, "Podrá intentarlo ya, sin esperar ni volver a leer las lecciones.")} data-testid="quitar-espera">
            <Timer className="w-3.5 h-3.5 mr-1" /> Quitar la espera
          </Button>
        )}
        {(p.tipo === "final" || p.tipo === "integral") && p.fallos > 0 && (
          <Button size="sm" variant="outline" className="h-8" onClick={() => alAccion("reiniciar-fallos", `Reiniciar los fallos del ${minuscula(p.titulo)}`, "Los fallos vuelven a cero: las esperas empiezan otra vez desde la más corta. Las notas de sus intentos no cambian.")} data-testid="reiniciar-fallos">
            <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reiniciar los fallos
          </Button>
        )}
        {p.tope != null && (
          <Button size="sm" variant="outline" className="h-8" onClick={() => alAccion("intento-extra", p.tipo === "breve" ? "Dar una entrega más del escrito breve" : p.tipo === "trabajo" ? `Dar una entrega más del ${p.titulo.replace("Trabajo final · ", "trabajo final de ")}` : `Dar un intento más: ${minuscula(p.titulo)}`, "Cuenta su mejor nota, como siempre.")} data-testid="intento-extra">
            <UserPlus className="w-3.5 h-3.5 mr-1" /> {p.tipo === "breve" || p.tipo === "trabajo" ? "Una entrega más" : "Un intento más"}
          </Button>
        )}
        {p.enCurso && (
          <Button size="sm" variant="outline" className="h-8 text-red-700 dark:text-red-300" onClick={() => alAccion("anular-en-curso", `Anular el intento en curso: ${minuscula(p.titulo)}`, "No cuenta: se borran sus respuestas de ese intento y puede empezarlo otra vez (con otras preguntas).", true)} data-testid="anular-en-curso">
            <XCircle className="w-3.5 h-3.5 mr-1" /> Anular el intento en curso
          </Button>
        )}
      </div>
    </li>
  );
}

function PanelMateria({ alumnoId, nombre, g }: { alumnoId: number; nombre: string; g: GestionMateria }) {
  const { abrir, caja } = useAcciones();
  const m = g.materia;
  const fija = g.via === "suficiencia" || g.via === "convalidada";
  const inscrito = !!g.inscrita;
  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 -mx-1 px-1 pt-1 bg-background/95 backdrop-blur empty:hidden">{caja}</div>

      {/* resumen */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
        <div className="rounded-xl bg-muted/50 p-3"><p className="text-xs text-muted-foreground">Estado</p><p className="font-semibold">{ESTADO[g.estado]}</p></div>
        <div className="rounded-xl bg-muted/50 p-3"><p className="text-xs text-muted-foreground">Nota de la materia</p><p className="font-semibold tabular-nums">{g.nota ?? "—"}</p></div>
        <div className="rounded-xl bg-muted/50 p-3"><p className="text-xs text-muted-foreground">Aprobada</p><p className="font-semibold">{g.via ? VIA[g.via] : "—"}</p></div>
        <div className="rounded-xl bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">Certificado</p>
          {g.certificado ? (
            <Link href={`/academia/certificado/${g.certificado.codigo}`} className={`font-semibold underline text-xs tracking-wider ${g.certificado.revocado ? "line-through text-red-600" : ""}`}>{g.certificado.codigo}</Link>
          ) : <p className="font-semibold">—</p>}
        </div>
      </div>
      <p className="text-xs text-muted-foreground -mt-4">
        {inscrito ? `Inscrito el ${fecha(g.inscrita!)}.` : "Todavía no está inscrito en esta materia."}
        {g.versiculo ? ` Versículo (${g.versiculo.ref}): ${g.versiculo.aprendido ? `aprendido${g.versiculo.puntaje != null ? `, ${g.versiculo.puntaje}` : ""}` : "pendiente"}.` : ""}
      </p>

      {/* la nota por partes */}
      <Seccion icono={Scale} titulo="La nota por partes" testid="gestion-componentes">
        {fija ? (
          <p className="text-sm text-muted-foreground">
            Aprobada {g.via ? VIA[g.via] : ""}: su nota es fija{g.via === "convalidada" ? " (la de la convalidación, que se cambia abajo)" : " (la del examen de suficiencia, que se cambia revisando sus respuestas escritas)"}.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">Un ajuste reemplaza lo que calcula el sistema y la nota de la materia se recalcula (con su certificado, el nivel y la especialidad).</p>
        )}
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-border">
                <th className="py-2 pr-2 font-medium">Parte</th>
                <th className="py-2 px-2 font-medium text-right">Sistema</th>
                <th className="py-2 px-2 font-medium text-right">Vale</th>
                <th className="py-2 pl-2" />
              </tr>
            </thead>
            <tbody>
              {g.componentes.map((c) => (
                <FilaComponente
                  key={c.id}
                  c={c}
                  fija={fija}
                  alAjustar={() =>
                    abrir({
                      titulo: `Ajustar «${c.texto}» de ${nombre}`,
                      detalle: `El sistema calcula ${c.calculado}${c.ajuste ? ` y hoy vale ${c.ajuste.nota} por un ajuste` : ""}. La materia se aprueba con ${APRUEBA} en la nota y ${APRUEBA} en el examen final.`,
                      nota: { min: 0, max: 100, inicial: c.ajuste?.nota ?? c.calculado, etiqueta: "La nota que vale (0 a 100)" },
                      confirmar: (motivo, nota) => ajustarComponente(alumnoId, m.id, { componente: c.id, nota, motivo }),
                    })
                  }
                  alQuitar={() =>
                    abrir({
                      titulo: `Quitar el ajuste de «${c.texto}»`,
                      detalle: `Vuelve a valer lo que calcula el sistema: ${c.calculado}.`,
                      confirmar: (motivo) => ajustarComponente(alumnoId, m.id, { componente: c.id, nota: null, motivo }),
                    })
                  }
                />
              ))}
            </tbody>
          </table>
        </div>
      </Seccion>

      {/* convalidación */}
      <Seccion icono={ShieldCheck} titulo="Convalidación" testid="gestion-convalidacion">
        <p className="text-sm text-muted-foreground">
          Para quien ya estudió esta materia en otro instituto: queda aprobada con la nota que pongas, con su certificado «por convalidación».
          {g.topeConvalidacion && ` En el Nivel ${m.nivel} lleva ${g.topeConvalidacion.usadas} por suficiencia o convalidación; el reglamento pide como máximo ${g.topeConvalidacion.tope}.`}
        </p>
        <div className="flex flex-wrap gap-2">
          {(g.via === null || g.via === "convalidada") && (
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                abrir({
                  titulo: g.via === "convalidada" ? `Cambiar la nota de la convalidación de «${m.titulo}»` : `Aprobar «${m.titulo}» por convalidación`,
                  detalle: "La nota va de 70 a 100. Se emite (o se actualiza) su certificado y se revisa su nivel.",
                  nota: { min: APRUEBA, max: 100, inicial: g.via === "convalidada" ? g.nota ?? APRUEBA : undefined, etiqueta: "Nota de la convalidación (70 a 100)" },
                  confirmar: (motivo, nota) => convalidarMateria(alumnoId, m.id, { nota, motivo }),
                })
              }
              data-testid="convalidar"
            >
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> {g.via === "convalidada" ? "Cambiar la nota" : "Aprobar por convalidación"}
            </Button>
          )}
          {g.via === "convalidada" && (
            <Button
              size="sm"
              variant="outline"
              className="text-red-700 dark:text-red-300"
              onClick={() =>
                abrir({
                  titulo: `Quitar la convalidación de «${m.titulo}»`,
                  detalle: "Su certificado queda revocado y la materia vuelve a contar lo que hizo cursándola.",
                  peligro: true,
                  confirmar: (motivo) => convalidarMateria(alumnoId, m.id, { nota: null, motivo }),
                })
              }
              data-testid="quitar-convalidacion"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Quitar la convalidación
            </Button>
          )}
          {g.via === "cursada" && <p className="text-sm">Ya la aprobó cursándola.</p>}
          {g.via === "suficiencia" && <p className="text-sm">Ya la aprobó por suficiencia.</p>}
        </div>
      </Seccion>

      {/* exámenes e intentos */}
      <Seccion icono={ClipboardCheck} titulo="Exámenes e intentos" testid="gestion-pruebas">
        <ul className="space-y-2">
          {g.pruebas.map((p) => (
            <TarjetaPrueba
              key={p.clave}
              p={p}
              alAccion={(accion, titulo, detalle, peligro) => abrir({ titulo, detalle, peligro, confirmar: (motivo) => accionPrueba(alumnoId, m.id, { clave: p.clave, accion, motivo }) })}
            />
          ))}
        </ul>
      </Seccion>

      {/* lecciones */}
      <Seccion icono={ListChecks} titulo={`Lecciones (${g.lecciones.filter((l) => l.completada).length} de ${g.lecciones.length})`} testid="gestion-lecciones">
        <ul className="divide-y divide-border/60 rounded-xl border border-border">
          {g.lecciones.map((l) => (
            <li key={l.id} className="flex items-center gap-3 px-3 py-2 text-sm">
              {l.completada ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-label="Completada" /> : <span className="w-4 h-4 rounded-full border border-border shrink-0" aria-label="Sin completar" />}
              <span className="flex-1 min-w-0">{l.n}. {l.titulo}</span>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 shrink-0"
                onClick={() =>
                  abrir({
                    titulo: l.completada ? `Volver a abrir la lección ${l.n}` : `Marcar como completada la lección ${l.n}`,
                    detalle: l.completada ? "Tendrá que leerla otra vez y responder su repaso." : "Cuenta como completada aunque no haya respondido su repaso (los repasos que no hizo no suman a su nota).",
                    confirmar: (motivo) => accionLeccion(alumnoId, m.id, { leccionId: l.id, accion: l.completada ? "abrir" : "completar", motivo }),
                  })
                }
                data-testid={`leccion-${l.n}`}
              >
                {l.completada ? "Volver a abrir" : "Completar"}
              </Button>
            </li>
          ))}
        </ul>
      </Seccion>

      {/* inscripción */}
      <Seccion icono={UserCheck} titulo="Inscripción en la materia" testid="gestion-inscripcion">
        {!inscrito ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => abrir({ titulo: `Inscribir a ${nombre} en «${m.titulo}»`, detalle: "Podrá empezar sus lecciones (sin pedirle los requisitos).", confirmar: (motivo) => inscripcionEnMateria(alumnoId, m.id, { accion: "inscribir", motivo }) })}
            data-testid="inscribir-materia"
          >
            <UserPlus className="w-3.5 h-3.5 mr-1" /> Inscribirlo en esta materia
          </Button>
        ) : g.estado === "aprobada" ? (
          <p className="text-sm text-muted-foreground">La aprobó: para quitarla, revoca su certificado (en Documentos) o quita la convalidación.</p>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="text-red-700 dark:text-red-300"
            onClick={() => abrir({ titulo: `Dar de baja a ${nombre} de «${m.titulo}»`, detalle: "Su avance en las lecciones queda guardado por si vuelve.", peligro: true, confirmar: (motivo) => inscripcionEnMateria(alumnoId, m.id, { accion: "baja", motivo }) })}
            data-testid="baja-materia"
          >
            <UserMinus className="w-3.5 h-3.5 mr-1" /> Darlo de baja de esta materia
          </Button>
        )}
      </Seccion>
    </div>
  );
}

/** El panel lateral de una materia del alumno (se abre desde «Gestionar» en su avance o desde las herramientas). */
export function GestionMateriaPanel({ alumnoId, nombre, materiaId, alCerrar }: { alumnoId: number; nombre: string; materiaId: string | null; alCerrar: () => void }) {
  const q = useGestionMateria(alumnoId, materiaId);
  return (
    <Sheet open={!!materiaId} onOpenChange={(abierto) => !abierto && alCerrar()}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto" data-testid="gestion-materia">
        <SheetHeader className="text-left">
          <SheetDescription className="data-label text-orange-600 dark:text-orange-300">{q.data ? `${q.data.materia.grupo} · ${nombre}` : nombre}</SheetDescription>
          <SheetTitle className="font-display text-2xl">{q.data?.materia.titulo ?? "Cargando la materia…"}</SheetTitle>
        </SheetHeader>
        <div className="mt-5">
          {q.isLoading && <p className="text-muted-foreground flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Cargando…</p>}
          {q.error && <p className="text-red-600 dark:text-red-400" role="alert">{q.error.message}</p>}
          {q.data && <PanelMateria alumnoId={alumnoId} nombre={nombre} g={q.data} />}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ---------------------------------------------------------------- las herramientas del alumno

function HistorialAlumno({ alumnoId }: { alumnoId: number }) {
  const [abierto, setAbierto] = useState(false);
  const q = useHistorialAlumno(alumnoId, abierto);
  return (
    <div>
      <Button size="sm" variant="ghost" onClick={() => setAbierto(!abierto)} aria-expanded={abierto} data-testid="historial-alumno-abrir">
        <ChevronDown className={`w-4 h-4 mr-1 transition ${abierto ? "rotate-180" : ""}`} /> {abierto ? "Ocultar el historial" : "Ver el historial de su expediente"}
      </Button>
      {abierto && (
        <div className="mt-2" data-testid="historial-alumno">
          {q.isLoading && <p className="text-sm text-muted-foreground">Cargando…</p>}
          {q.data && q.data.historial.length === 0 && <p className="text-sm text-muted-foreground">Todavía no hay cambios en su expediente.</p>}
          <ol className="space-y-2">
            {q.data?.historial.map((h) => (
              <li key={h.id} className="rounded-lg border border-border/70 p-2.5 text-sm">
                <p>{h.texto}</p>
                {h.motivo && <p className="text-xs text-muted-foreground mt-0.5">Motivo: «{h.motivo}»</p>}
                <p className="text-xs text-muted-foreground mt-0.5">{h.por} · {new Date(h.fecha).toLocaleString("es", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" })}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

function Mensaje({ alumnoId, nombre }: { alumnoId: number; nombre: string }) {
  const [texto, setTexto] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [aviso, setAviso] = useState<{ ok: boolean; texto: string } | null>(null);
  const enviar = async () => {
    setOcupado(true);
    setAviso(null);
    try {
      const r = await escribirAlumno(alumnoId, texto);
      setAviso({ ok: true, texto: r.mensaje });
      setTexto("");
    } catch (e: any) {
      setAviso({ ok: false, texto: e?.message ?? "No se pudo enviar." });
    } finally {
      setOcupado(false);
    }
  };
  return (
    <div className="space-y-2">
      <label className="text-sm block">
        Escribirle a {nombre} (le llega en la campana)
        <Textarea value={texto} onChange={(e) => setTexto(e.target.value)} rows={3} maxLength={1000} className="mt-1 text-[16px]" data-testid="mensaje-texto" />
      </label>
      <div className="flex items-center gap-3">
        <Button size="sm" variant="outline" onClick={enviar} disabled={ocupado || texto.trim().length < 8} data-testid="mensaje-enviar">
          <MessageSquare className="w-3.5 h-3.5 mr-1" /> {ocupado ? "Enviando…" : "Enviar el mensaje"}
        </Button>
        <span className="text-xs text-muted-foreground">{texto.length}/1000</span>
      </div>
      {aviso && <p className={`text-sm ${aviso.ok ? "text-emerald-700 dark:text-emerald-300" : "text-red-600 dark:text-red-400"}`} role="status">{aviso.texto}</p>}
    </div>
  );
}

/** Las herramientas de la Administración sobre el alumno: estatus, tiempo extra, gestionar otra materia, mensaje e historial. */
export function HerramientasAlumno({ d, alGestionar }: { d: AlumnoDetalle; alGestionar: (materiaId: string) => void }) {
  const { abrir, caja } = useAcciones();
  const [otra, setOtra] = useState("");
  const g = d.gestion;
  if (!g) return null;
  const id = d.fila.userId;
  const nombre = d.fila.nombre;
  const grupos = [...new Set(g.inscribibles.map((x) => x.grupo))];
  return (
    <section className="glass-card p-5 space-y-5 border border-orange-500/30" data-testid="herramientas-alumno">
      <div>
        <h2 className="font-semibold flex items-center gap-2"><Settings2 className="w-4 h-4 text-orange-600" /> Herramientas de la Administración</h2>
        <p className="text-sm text-muted-foreground mt-1">Cada cambio pide un motivo, queda en el historial y le llega a {nombre} en la campana. Para su nota, sus exámenes y sus lecciones, toca «Gestionar» en cada materia.</p>
      </div>
      {caja}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border p-3">
          <p className="text-xs text-muted-foreground">Estatus</p>
          <p className="font-semibold">{g.retirado ? "Retirado" : "Activo"}</p>
          <Button
            size="sm"
            variant="outline"
            className={`mt-2 ${g.retirado ? "" : "text-red-700 dark:text-red-300"}`}
            onClick={() =>
              abrir(
                g.retirado
                  ? { titulo: `Reactivar a ${nombre}`, detalle: "Vuelve a estar activo en la academia.", confirmar: (motivo) => cambiarEstatusAlumno(id, { estatus: "activo", motivo }) }
                  : { titulo: `Registrar a ${nombre} como retirado`, detalle: "Su avance, sus notas y sus documentos quedan guardados; se puede reactivar cuando quiera.", peligro: true, confirmar: (motivo) => cambiarEstatusAlumno(id, { estatus: "retirado", motivo }) },
              )
            }
            data-testid="estatus-alumno"
          >
            {g.retirado ? <><UserCheck className="w-3.5 h-3.5 mr-1" /> Reactivar</> : <><UserMinus className="w-3.5 h-3.5 mr-1" /> Registrar como retirado</>}
          </Button>
        </div>
        <div className="rounded-xl border border-border p-3">
          <p className="text-xs text-muted-foreground">Tiempo en los exámenes</p>
          <p className="font-semibold">{g.tiempoExtra ? "Con tiempo extra (×1,5)" : "Normal"}</p>
          <Button
            size="sm"
            variant="outline"
            className="mt-2"
            onClick={() =>
              abrir(
                g.tiempoExtra
                  ? { titulo: `Quitarle el tiempo extra a ${nombre}`, detalle: "Sus exámenes vuelven a los relojes de siempre.", confirmar: (motivo) => cambiarTiempoExtra(id, { activo: false, motivo }) }
                  : { titulo: `Darle tiempo extra a ${nombre}`, detalle: "En todos sus exámenes (finales, mini pruebas, integrales y suficiencia), cada reloj dura 1,5 veces más. Las preguntas son las mismas.", confirmar: (motivo) => cambiarTiempoExtra(id, { activo: true, motivo }) },
              )
            }
            data-testid="tiempo-extra"
          >
            <Timer className="w-3.5 h-3.5 mr-1" /> {g.tiempoExtra ? "Quitar el tiempo extra" : "Dar tiempo extra"}
          </Button>
        </div>
      </div>
      {(g.cierres?.length ?? 0) > 0 && (
        <Seccion icono={Award} titulo="Integral y trabajo final" testid="gestion-cierres">
          <p className="text-sm text-muted-foreground">Los exámenes integrales de sus niveles y los trabajos finales de sus especialidades que ya empezó.</p>
          <ul className="space-y-2">
            {g.cierres!.map((p) => (
              <TarjetaPrueba
                key={p.clave}
                p={p}
                alAccion={(accion, titulo, detalle, peligro) => abrir({ titulo, detalle, peligro, confirmar: (motivo) => accionCierre(id, { clave: p.clave, accion, motivo }) })}
              />
            ))}
          </ul>
        </Seccion>
      )}
      {g.inscribibles.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm block" htmlFor="gestion-otra-materia">Otra materia (para inscribirlo o convalidarla)</label>
          <div className="flex flex-wrap gap-2">
            <select
              id="gestion-otra-materia"
              value={otra}
              onChange={(e) => setOtra(e.target.value)}
              className="h-10 rounded-md border border-border bg-background px-3 text-[16px] sm:text-sm max-w-full"
              data-testid="otra-materia"
            >
              <option value="">Elige una materia…</option>
              {grupos.map((gr) => (
                <optgroup key={gr} label={gr}>
                  {g.inscribibles.filter((x) => x.grupo === gr).map((x) => <option key={x.id} value={x.id}>{x.titulo}</option>)}
                </optgroup>
              ))}
            </select>
            <Button size="sm" variant="outline" className="h-10" disabled={!otra} onClick={() => alGestionar(otra)} data-testid="otra-materia-abrir">
              <Settings2 className="w-3.5 h-3.5 mr-1" /> Gestionar esa materia
            </Button>
          </div>
        </div>
      )}
      <Mensaje alumnoId={id} nombre={nombre} />
      <HistorialAlumno alumnoId={id} />
    </section>
  );
}
