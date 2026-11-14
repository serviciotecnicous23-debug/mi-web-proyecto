// La revisión del contenido de una materia (server/academia-calidad.ts): sus lecciones para leerlas, las observaciones
// de quien la revisa, la aprobación doctrinal de la Dirección académica y el análisis de cada pregunta de su banco (como
// el informe estadístico de Moodle), con la opción de retirar una pregunta: ya no sale en los intentos nuevos y las
// notas ya dadas no cambian.
import { useRef, useState } from "react";
import { Link, useParams } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle, ArrowLeft, Ban, BookOpen, CheckCircle2, ChevronRight, Clock, MessageSquarePlus, RotateCcw, ShieldCheck, ShieldOff, XCircle,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { loginUrl } from "@/lib/login-redirect";
import type { ContenidoDetalle, EscritaAnalisis, ObservacionContenido, PreguntaAnalisis } from "@shared/academia-calidad";
import {
  accionPregunta, aprobarContenido, desaprobarContenido, observarContenido, resolverObservacion, useContenidoMateria,
} from "@/components/academia/api";
import { Cargando } from "@/components/academia/ui";
import { Indicador, Medidor, fecha, hace } from "@/components/academia/seguimiento";

const CHIP = "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs whitespace-nowrap";
const SELECT =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring";
const CLAVE_CONTENIDO = ["academia", "direccion", "contenido"];
const dosDecimales = (n: number) => n.toLocaleString("es", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const minuscula = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);
const esPocos = (b: string) => b.startsWith("Pocos datos");
const conAlerta = (banderas: string[]) => banderas.some((b) => !esPocos(b));
/** Las banderas más graves van resaltadas (siempre con su ícono y su texto, nunca solo con color). */
const GRAVES = new Set(["Discrimina al revés", "Muy difícil", "La revisión la cambia seguido: a la clave le faltan formas"]);

function Banderas({ banderas }: { banderas: string[] }) {
  if (!banderas.length) return <span className={`${CHIP} bg-muted`}><CheckCircle2 className="w-3 h-3" aria-hidden="true" /> Sin alertas</span>;
  return (
    <>
      {banderas.map((b) => (
        <span key={b} className={`${CHIP} ${GRAVES.has(b) ? "bg-orange-500/15 font-medium" : "bg-muted"}`}>
          {esPocos(b) ? <Clock className="w-3 h-3" aria-hidden="true" /> : <AlertTriangle className="w-3 h-3" aria-hidden="true" />} {b}
        </span>
      ))}
    </>
  );
}

/** Una cifra del análisis: la etiqueta arriba y el valor (con su medidor si es un porcentaje de 0 a 100). */
function Cifra({ etiqueta, valor, pct, ayuda }: { etiqueta: string; valor: string; pct?: number | null; ayuda?: string }) {
  return (
    <div title={ayuda}>
      <dt className="text-xs text-muted-foreground">{etiqueta}</dt>
      <dd className="mt-1 flex items-center gap-2">
        {pct != null && <Medidor valor={pct} etiqueta={`${etiqueta}: ${valor}`} />}
        <span className="tabular-nums font-medium whitespace-nowrap">{valor}</span>
      </dd>
    </div>
  );
}

// ---------------------------------------------------------------- retirar o volver a usar una pregunta

function AccionBanco({ id, retirada, noSeRetira }: { id: string; retirada: boolean; noSeRetira: string | null }) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [abierto, setAbierto] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const enviar = async () => {
    setOcupado(true);
    setError(null);
    try {
      await accionPregunta(id, retirada ? "restaurar" : "retirar", motivo);
      toast({
        title: retirada ? "La pregunta vuelve al banco" : "Pregunta retirada del banco",
        description: retirada ? "Puede volver a salir en los intentos nuevos." : "Ya no sale en los intentos nuevos. Las notas ya dadas no cambian.",
      });
      setAbierto(false);
      setMotivo("");
      void qc.invalidateQueries({ queryKey: CLAVE_CONTENIDO });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };
  if (!abierto) {
    return (
      <Button size="sm" variant="outline" onClick={() => setAbierto(true)} data-testid={retirada ? "pregunta-restaurar" : "pregunta-retirar"}>
        {retirada ? <RotateCcw className="w-4 h-4 mr-1.5" /> : <Ban className="w-4 h-4 mr-1.5" />}
        {retirada ? "Volver a usarla" : "Retirar del banco"}
      </Button>
    );
  }
  if (!retirada && noSeRetira) {
    return (
      <div className="rounded-xl border border-border p-3 space-y-2" role="status">
        <p className="text-sm"><Ban className="w-4 h-4 inline -mt-0.5 mr-1" aria-hidden="true" /> No se puede retirar: {minuscula(noSeRetira)}</p>
        <Button size="sm" variant="ghost" onClick={() => setAbierto(false)}>Entendido</Button>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-border p-3 space-y-2">
      <label className="text-sm block">
        {retirada ? "Por qué vuelve a usarse (queda en el historial)" : "Por qué se retira (queda en el historial)"}
        <Textarea
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          rows={2}
          maxLength={500}
          className="mt-1 text-[16px]"
          placeholder={retirada ? "Por ejemplo: ya se corrigió la redacción de la opción que confundía." : "Por ejemplo: la aciertan más los que peor van; la opción B también puede leerse como correcta."}
          data-testid="pregunta-motivo"
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" className="fire-btn-primary" onClick={enviar} disabled={ocupado || motivo.trim().length < 8} data-testid="pregunta-confirmar">
          {ocupado ? "Guardando…" : retirada ? "Volver a usarla" : "Retirarla del banco"}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setAbierto(false)} disabled={ocupado}>Cancelar</Button>
      </div>
      {error && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
    </div>
  );
}

function Retirada({ r }: { r: { por: string; fecha: string; motivo: string } }) {
  return (
    <p className="text-sm rounded-lg bg-muted px-3 py-2">
      <Ban className="w-4 h-4 inline -mt-0.5 mr-1" aria-hidden="true" /> Retirada del banco por {r.por} el {fecha(r.fecha)}: «{r.motivo}». Ya no sale en los intentos nuevos.
    </p>
  );
}

// ---------------------------------------------------------------- las tarjetas del análisis

function TarjetaPregunta({ p, puedeBanco }: { p: PreguntaAnalisis; puedeBanco: boolean }) {
  return (
    <article className={`glass-card p-4 space-y-3 ${p.retirada ? "opacity-75" : ""}`} data-testid="pregunta-analisis" data-pregunta={p.id} data-retirada={!!p.retirada}>
      <header className="flex flex-wrap items-start justify-between gap-2">
        <p className="text-xs text-muted-foreground">Lección {p.leccion} · {p.id}</p>
        <div className="flex flex-wrap gap-1.5"><Banderas banderas={p.banderas} /></div>
      </header>
      <p className="font-medium">{p.texto}</p>
      <ul className="space-y-1.5 text-sm">
        <li className="flex gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" aria-label="La correcta" />
          <span>{p.correcta}</span>
        </li>
        {p.falsas.map((f) => (
          <li key={f} className="flex gap-2">
            <XCircle className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" aria-label="Falsa" />
            <span>
              {f}
              {p.distractor?.texto === f && (
                <span className={`${CHIP} bg-orange-500/15 ml-2 align-middle`} data-testid="pregunta-distractor">
                  La eligieron {p.distractor.veces} ({p.distractor.parte} % de los errores)
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-sm text-muted-foreground">{p.explica} <span className="whitespace-nowrap">({p.ref})</span></p>
      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm border-t border-border/60 pt-3">
        <Cifra etiqueta="Facilidad" valor={p.facilidad == null ? "—" : `${p.facilidad} %`} pct={p.facilidad} ayuda="Qué parte de los intentos la acertó" />
        <Cifra
          etiqueta="Discriminación"
          valor={p.discriminacion == null ? "—" : dosDecimales(p.discriminacion)}
          ayuda="De −1 a 1: si es positiva, la aciertan más los que mejor van en el resto del examen"
        />
        <Cifra etiqueta="Sin tiempo" valor={p.tarde == null ? "—" : `${p.tarde} %`} ayuda="Cuántos dejaron vencer el reloj" />
        <Cifra etiqueta="Intentos" valor={String(p.n)} ayuda="Intentos cerrados del examen final y del integral en que salió" />
      </dl>
      {p.retirada && <Retirada r={p.retirada} />}
      {puedeBanco && <AccionBanco id={p.id} retirada={!!p.retirada} noSeRetira={p.noSeRetira} />}
    </article>
  );
}

function TarjetaEscrita({ e, puedeBanco }: { e: EscritaAnalisis; puedeBanco: boolean }) {
  return (
    <article className={`glass-card p-4 space-y-3 ${e.retirada ? "opacity-75" : ""}`} data-testid="escrita-analisis" data-pregunta={e.id}>
      <header className="flex flex-wrap items-start justify-between gap-2">
        <p className="text-xs text-muted-foreground">Pregunta escrita · {e.id}</p>
        <div className="flex flex-wrap gap-1.5"><Banderas banderas={e.banderas} /></div>
      </header>
      <p className="font-medium">{e.pregunta}</p>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold mb-1">Las ideas de la clave</p>
          <ul className="space-y-1 text-sm list-disc pl-5">
            {e.ideas.map((i) => <li key={i.texto}>{i.texto} <span className="text-muted-foreground">({i.peso} puntos)</span></li>)}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold mb-1">Respuesta modelo</p>
          <p className="text-sm text-muted-foreground">{e.modelo}</p>
        </div>
      </div>
      <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm border-t border-border/60 pt-3">
        <Cifra etiqueta="Respuestas" valor={String(e.n)} />
        <Cifra etiqueta="Nota media" valor={e.promedio == null ? "—" : String(e.promedio)} pct={e.promedio} />
        <Cifra etiqueta="Para revisar" valor={e.marcadas == null ? "—" : `${e.marcadas} %`} ayuda="Cuántas dejó el corrector para revisar" />
        <Cifra
          etiqueta="Cambiadas en la revisión"
          valor={e.cambiadas == null ? "—" : `${e.cambiadas} %${e.cambioMedio ? ` (${e.cambioMedio > 0 ? "+" : "−"}${Math.abs(e.cambioMedio)})` : ""}`}
          ayuda="Cuántas notas cambió la revisión y en cuánto, en promedio"
        />
      </dl>
      {e.retirada && <Retirada r={e.retirada} />}
      {puedeBanco && <AccionBanco id={e.id} retirada={!!e.retirada} noSeRetira={e.noSeRetira} />}
    </article>
  );
}

// ---------------------------------------------------------------- la aprobación doctrinal

function Aprobacion({ d }: { d: ContenidoDetalle }) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [modo, setModo] = useState<"" | "aprobar" | "quitar">("");
  const [texto, setTexto] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const a = d.aprobacion;
  const abiertas = d.observaciones.filter((o) => !o.resuelta).length;
  const enviar = async () => {
    setOcupado(true);
    setError(null);
    try {
      if (modo === "aprobar") await aprobarContenido(d.materia.id, texto);
      else await desaprobarContenido(d.materia.id, texto);
      toast({
        title: modo === "aprobar" ? `«${d.materia.titulo}» aprobada` : "Aprobación quitada",
        description: modo === "aprobar" ? "Queda en el historial con tu nombre y la fecha." : "La materia vuelve a estar por revisar.",
      });
      setModo("");
      setTexto("");
      void qc.invalidateQueries({ queryKey: ["academia", "direccion"] });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };
  const vigente = !!a?.vigente;
  return (
    <section className={`glass-card p-5 border ${vigente ? "border-emerald-500/40" : "border-orange-500/40"}`} data-testid="contenido-aprobacion" data-estado={vigente ? "aprobada" : a ? "cambio" : "pendiente"}>
      <div className="flex flex-col md:flex-row md:items-start gap-3">
        {vigente ? <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" aria-hidden="true" /> : <ShieldOff className="w-6 h-6 text-orange-500 shrink-0" aria-hidden="true" />}
        <div className="flex-1 min-w-0">
          <p className="font-semibold">
            {vigente ? "Aprobada en la revisión doctrinal" : a ? "El contenido cambió después de la aprobación" : "Sin aprobar en la revisión doctrinal"}
          </p>
          <p className="text-sm text-muted-foreground">
            {vigente
              ? `La aprobó ${a!.por} el ${fecha(a!.fecha)}.`
              : a
                ? `La aprobó ${a.por} el ${fecha(a.fecha)}, pero después cambiaron sus lecciones o su banco de preguntas. Vuelve a revisarla y apruébala otra vez.`
                : "Léela completa (las lecciones, el banco del examen y el repaso), deja las observaciones que haga falta y apruébala cuando esté bien. Lo recomendado es abrir la academia con todas sus materias aprobadas."}
          </p>
          {a?.notas && <p className="text-sm mt-1">Notas: «{a.notas}»</p>}
          {!d.puede.aprobar && <p className="text-xs text-muted-foreground mt-1">La aprobación la da la Dirección académica.</p>}
        </div>
        {d.puede.aprobar && !modo && (
          <div className="flex flex-wrap gap-2">
            {!vigente && (
              <Button className="fire-btn-primary" onClick={() => setModo("aprobar")} disabled={abiertas > 0} data-testid="contenido-aprobar">
                <ShieldCheck className="w-4 h-4 mr-1.5" /> {a ? "Aprobarla otra vez" : "Aprobar la materia"}
              </Button>
            )}
            {a && (
              <Button variant="outline" onClick={() => setModo("quitar")} data-testid="contenido-desaprobar">
                Quitar la aprobación
              </Button>
            )}
          </div>
        )}
      </div>
      {d.puede.aprobar && !vigente && abiertas > 0 && !modo && (
        <p className="text-sm mt-3" data-testid="contenido-abiertas-aviso">
          <AlertTriangle className="w-4 h-4 inline -mt-0.5 mr-1 text-orange-500" aria-hidden="true" />
          Antes de aprobarla, resuelve {abiertas === 1 ? "la observación abierta" : `las ${abiertas} observaciones abiertas`}.
        </p>
      )}
      {modo && (
        <div className="mt-4 rounded-xl border border-border p-4 space-y-3">
          <label className="text-sm block">
            {modo === "aprobar" ? "Notas de la aprobación (opcional): qué revisaste y quién la revisó contigo" : "Motivo (queda en el historial)"}
            <Textarea value={texto} onChange={(e) => setTexto(e.target.value)} rows={2} maxLength={500} className="mt-1 text-[16px]" data-testid="contenido-aprobacion-texto" />
          </label>
          <div className="flex flex-wrap gap-2">
            <Button className="fire-btn-primary" onClick={enviar} disabled={ocupado || (modo === "quitar" && texto.trim().length < 8)} data-testid="contenido-aprobacion-confirmar">
              {ocupado ? "Guardando…" : modo === "aprobar" ? "Sí, aprobarla" : "Sí, quitar la aprobación"}
            </Button>
            <Button variant="ghost" onClick={() => setModo("")} disabled={ocupado}>Cancelar</Button>
          </div>
        </div>
      )}
      {error && <p className="text-sm text-red-600 dark:text-red-400 mt-3" role="alert">{error}</p>}
    </section>
  );
}

// ---------------------------------------------------------------- las observaciones

function TarjetaObservacion({ o }: { o: ObservacionContenido & { puedeResolver: boolean } }) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [abierto, setAbierto] = useState(false);
  const [respuesta, setRespuesta] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resolver = async () => {
    setOcupado(true);
    setError(null);
    try {
      await resolverObservacion(o.id, respuesta);
      toast({ title: "Observación resuelta", description: o.propia ? "Queda con tu respuesta en la lista." : `${o.por} recibirá tu respuesta en un aviso.` });
      setAbierto(false);
      setRespuesta("");
      void qc.invalidateQueries({ queryKey: ["academia", "direccion"] });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };
  return (
    <li className={`rounded-2xl border p-4 space-y-2 ${o.resuelta ? "border-border" : "border-orange-500/50"}`} data-testid="observacion" data-estado={o.resuelta ? "resuelta" : "abierta"}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="text-sm">
          <span className="font-semibold">{o.por}</span> <span className="text-muted-foreground">· {hace(o.fecha)}</span>
        </p>
        <div className="flex flex-wrap gap-1.5">
          <span className={`${CHIP} bg-muted`}><BookOpen className="w-3 h-3" aria-hidden="true" /> {o.leccion ?? "Toda la materia"}</span>
          <span className={`${CHIP} ${o.resuelta ? "bg-muted" : "bg-orange-500/15 font-medium"}`}>{o.resuelta ? "Resuelta" : "Abierta"}</span>
        </div>
      </div>
      <p className="text-[15px] whitespace-pre-wrap break-words">{o.texto}</p>
      {o.resuelta ? (
        <p className="text-sm text-muted-foreground">
          <CheckCircle2 className="w-4 h-4 inline -mt-0.5 mr-1 text-emerald-600" aria-hidden="true" />
          Resuelta por {o.resuelta.por} el {fecha(o.resuelta.fecha)}{o.resuelta.respuesta ? `: «${o.resuelta.respuesta}»` : "."}
        </p>
      ) : (
        o.puedeResolver &&
        (abierto ? (
          <div className="space-y-2">
            <label className="text-sm block">
              Qué se hizo: qué se corrigió o por qué no hace falta cambiarlo
              <Textarea value={respuesta} onChange={(e) => setRespuesta(e.target.value)} rows={2} maxLength={1000} className="mt-1 text-[16px]" data-testid="observacion-respuesta" />
            </label>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" className="fire-btn-primary" onClick={resolver} disabled={ocupado || respuesta.trim().length < 8} data-testid="observacion-resolver-confirmar">
                {ocupado ? "Guardando…" : "Dar por resuelta"}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setAbierto(false)} disabled={ocupado}>Cancelar</Button>
            </div>
            {error && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
          </div>
        ) : (
          <Button size="sm" variant="outline" onClick={() => setAbierto(true)} data-testid="observacion-resolver">
            <CheckCircle2 className="w-4 h-4 mr-1.5" /> Resolver
          </Button>
        ))
      )}
    </li>
  );
}

function Lecciones({ d }: { d: ContenidoDetalle }) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [leccion, setLeccion] = useState("");
  const [texto, setTexto] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const caja = useRef<HTMLTextAreaElement>(null);
  const observarLeccion = (id: string) => {
    setLeccion(id);
    caja.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => caja.current?.focus(), 300);
  };
  const enviar = async () => {
    setOcupado(true);
    setError(null);
    try {
      await observarContenido(d.materia.id, texto, leccion || null);
      toast({ title: "Observación guardada", description: "La Dirección académica la ve en la campana y en esta página." });
      setTexto("");
      void qc.invalidateQueries({ queryKey: ["academia", "direccion"] });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };
  const abiertas = d.observaciones.filter((o) => !o.resuelta);
  const resueltas = d.observaciones.filter((o) => o.resuelta);
  const puedeResolver = (o: ObservacionContenido) => d.puede.aprobar || o.propia;
  return (
    <div className="space-y-6">
      <section className="glass-card p-5">
        <h2 className="font-semibold mb-1">Las lecciones</h2>
        <p className="text-sm text-muted-foreground mb-3">Ábrelas en el lector, igual que las ve el alumno. Si algo hay que revisar, deja una observación.</p>
        <ol className="divide-y divide-border/60" data-testid="contenido-lecciones">
          {d.lecciones.map((l, k) => (
            <li key={l.id} className="py-3 flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex-1 min-w-0">
                <p className="font-medium">{k + 1}. {l.titulo}</p>
                <p className="text-xs text-muted-foreground">{l.minutos} minutos · {l.base}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href={`/academia/leccion/${l.id}`}>
                  <Button size="sm" variant="outline"><BookOpen className="w-4 h-4 mr-1.5" /> Leer</Button>
                </Link>
                {d.puede.observar && (
                  <Button size="sm" variant="ghost" onClick={() => observarLeccion(l.id)} data-testid="leccion-observar">
                    <MessageSquarePlus className="w-4 h-4 mr-1.5" /> Observar
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="glass-card p-5 space-y-4" data-testid="contenido-observaciones">
        <div>
          <h2 className="font-semibold">Observaciones</h2>
          <p className="text-sm text-muted-foreground">Lo que hay que corregir o aclarar: una afirmación sin base, una cita, una pregunta confusa. La resuelve quien la dejó o la Dirección académica, contando qué se hizo.</p>
        </div>
        {d.puede.observar && (
          <div className="rounded-xl border border-border p-4 space-y-3">
            <label className="text-sm block">
              Sobre
              <select value={leccion} onChange={(e) => setLeccion(e.target.value)} className={`${SELECT} mt-1`} data-testid="observacion-leccion">
                <option value="">Toda la materia</option>
                {d.lecciones.map((l, k) => <option key={l.id} value={l.id}>Lección {k + 1}: {l.titulo}</option>)}
              </select>
            </label>
            <label className="text-sm block">
              Tu observación (con la cita, si aplica)
              <Textarea
                ref={caja}
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                rows={3}
                maxLength={1500}
                className="mt-1 text-[16px]"
                placeholder="Por ejemplo: en «La lectura», el segundo párrafo dice que… pero Romanos 10:9 enseña que…"
                data-testid="observacion-texto"
              />
            </label>
            <Button className="fire-btn-primary" onClick={enviar} disabled={ocupado || texto.trim().length < 8} data-testid="observacion-enviar">
              <MessageSquarePlus className="w-4 h-4 mr-1.5" /> {ocupado ? "Guardando…" : "Dejar la observación"}
            </Button>
            {error && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
          </div>
        )}
        {d.observaciones.length === 0 ? (
          <p className="text-sm text-muted-foreground">Todavía no hay observaciones.</p>
        ) : (
          <ul className="space-y-3">
            {[...abiertas, ...resueltas].map((o) => <TarjetaObservacion key={o.id} o={{ ...o, puedeResolver: puedeResolver(o) }} />)}
          </ul>
        )}
      </section>
    </div>
  );
}

// ---------------------------------------------------------------- el análisis

function Analisis({ d }: { d: ContenidoDetalle }) {
  const u = d.umbrales;
  const mirar = d.objetivas.filter((p) => !p.retirada && conAlerta(p.banderas));
  const retiradas = d.objetivas.filter((p) => p.retirada);
  const [filtro, setFiltro] = useState<"mirar" | "todas" | "retiradas">(() => (mirar.length ? "mirar" : "todas"));
  const lista = filtro === "mirar" ? mirar : filtro === "retiradas" ? retiradas : d.objetivas;
  const total = d.intentos.final + d.intentos.integral;
  return (
    <div className="space-y-4">
      <section className="glass-card p-5 text-sm space-y-2" data-testid="analisis-explicacion">
        <h2 className="font-semibold text-base">Cómo leer el análisis</h2>
        <p className="text-muted-foreground">
          {total === 0
            ? "Todavía no hay intentos cerrados de este examen: cuando los alumnos lo den, aquí saldrán las cifras de cada pregunta."
            : `Sale de ${total} ${total === 1 ? "intento cerrado" : "intentos cerrados"} (${d.intentos.final} del examen final y ${d.intentos.integral} del examen integral del nivel).`}{" "}
          Con menos de {u.minimo} intentos de una pregunta no se saca ninguna conclusión.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Facilidad:</strong> qué parte de los intentos la acertó. Menos de {u.muyDificil} % es muy difícil; más de {u.muyFacil} %, muy fácil.</li>
          <li><strong>Discriminación:</strong> de −1 a 1. Una buena pregunta la aciertan más los que mejor van en el resto del examen (desde {dosDecimales(u.discriminaPoco)}). Si es negativa, la aciertan más los que peor van: hay que revisarla.</li>
          <li><strong>Sin tiempo:</strong> cuántos dejaron vencer el reloj (desde {u.tarde} % se marca) y cuentan como error.</li>
          <li><strong>La falsa más elegida:</strong> si una opción falsa confunde a muchos, puede ser la redacción.</li>
        </ul>
        <p className="text-muted-foreground">Una pregunta que falla se corrige en el contenido, o se retira del banco: deja de salir en los intentos nuevos y las notas ya dadas no cambian.</p>
      </section>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Qué preguntas ver">
        {(
          [
            ["mirar", `Para mirar (${mirar.length})`],
            ["todas", `Todas (${d.objetivas.length})`],
            ["retiradas", `Retiradas (${retiradas.length})`],
          ] as const
        ).map(([id, texto]) => (
          <Button key={id} size="sm" variant={filtro === id ? "default" : "outline"} className={filtro === id ? "fire-btn-primary" : ""} onClick={() => setFiltro(id)} aria-pressed={filtro === id} data-testid={`analisis-filtro-${id}`}>
            {texto}
          </Button>
        ))}
      </div>
      {lista.length === 0 ? (
        <p className="glass-card p-5 text-sm text-muted-foreground">
          {filtro === "mirar" ? "Ninguna pregunta tiene alertas por ahora." : filtro === "retiradas" ? "No hay preguntas retiradas." : "El banco está vacío."}
        </p>
      ) : (
        <div className="space-y-3">{lista.map((p) => <TarjetaPregunta key={p.id} p={p} puedeBanco={d.puede.banco} />)}</div>
      )}
    </div>
  );
}

function Repaso({ d }: { d: ContenidoDetalle }) {
  return (
    <div className="space-y-3" data-testid="contenido-repaso">
      <p className="text-sm text-muted-foreground">Las preguntas del repaso de cada lección, con su respuesta y su explicación: el alumno las ve al terminar la lección.</p>
      {d.repaso.map((r, k) => (
        <details key={r.leccionId} className="glass-card p-4 group">
          <summary className="cursor-pointer list-none flex items-center gap-2 font-medium">
            <ChevronRight className="w-4 h-4 transition group-open:rotate-90" aria-hidden="true" />
            Lección {k + 1}: {r.leccion} <span className="text-sm text-muted-foreground font-normal">({r.preguntas.length} {r.preguntas.length === 1 ? "pregunta" : "preguntas"})</span>
          </summary>
          <ol className="mt-3 space-y-4">
            {r.preguntas.map((p) => (
              <li key={p.id} className="text-sm space-y-1.5">
                <p className="font-medium">{p.texto}</p>
                <p className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" aria-label="La correcta" /> {p.correcta}</p>
                {p.falsas.map((f) => <p key={f} className="flex gap-2"><XCircle className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" aria-label="Falsa" /> {f}</p>)}
                <p className="text-muted-foreground">{p.explica} <span className="whitespace-nowrap">({p.ref})</span></p>
              </li>
            ))}
          </ol>
        </details>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------- la página

export default function AcademiaDireccionContenido() {
  const { materiaId } = useParams<{ materiaId: string }>();
  const q = useContenidoMateria(materiaId);
  const [tab, setTab] = useState(() => {
    const t = new URLSearchParams(window.location.search).get("tab");
    return t && ["lecciones", "examen", "escritas", "repaso"].includes(t) ? t : "lecciones";
  });
  if (q.isLoading) return <Cargando />;
  if (!q.data) {
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <p className="text-lg mb-6">{q.error?.message ?? "No se pudo cargar la materia."}</p>
          {q.error?.status === 401 ? (
            <a href={loginUrl()}><Button className="fire-btn-primary h-12 px-7">Entrar</Button></a>
          ) : (
            <Link href="/academia/direccion?tab=contenido"><Button variant="outline" className="h-12 px-7">Volver al panel</Button></Link>
          )}
        </div>
      </Layout>
    );
  }
  const d = q.data;
  const m = d.materia;
  const abiertas = d.observaciones.filter((o) => !o.resuelta).length;
  const activas = d.objetivas.filter((p) => !p.retirada).length;
  const mirar = d.objetivas.filter((p) => !p.retirada && conAlerta(p.banderas)).length + d.escritas.filter((e) => !e.retirada && conAlerta(e.banderas)).length;
  const repaso = d.repaso.reduce((s, r) => s + r.preguntas.length, 0);
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 pt-6 pb-16 space-y-6">
        <Link href="/academia/direccion?tab=contenido" className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Revisión del contenido
        </Link>
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <p className="data-label text-orange-600 dark:text-orange-300">{m.nivel ? `Nivel ${m.nivel}` : "Especialidad"} · Revisión del contenido</p>
            <h1 className="heading-display font-display text-3xl md:text-4xl mt-1" data-testid="contenido-titulo">{m.titulo}</h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl">{m.resumen}</p>
            {m.memoria && <p className="text-sm mt-1">Versículo de memoria: <strong>{m.memoria}</strong></p>}
          </div>
          <Link href={`/academia/materia/${m.id}`}><Button variant="outline" size="sm">Ver la materia como alumno</Button></Link>
        </header>

        <Aprobacion d={d} />

        <div className="grid gap-3 grid-cols-2 lg:grid-cols-5">
          <Indicador etiqueta="Lecciones" valor={d.lecciones.length} nota={`${repaso} preguntas de repaso`} />
          <Indicador etiqueta="Banco del examen" valor={`${activas} de ${d.objetivas.length}`} nota="preguntas en uso" />
          <Indicador etiqueta="Preguntas escritas" valor={d.escritas.filter((e) => !e.retirada).length} nota={`de ${d.escritas.length} en el banco`} />
          <Indicador etiqueta="Para mirar" valor={mirar} nota="según el análisis" />
          <Indicador etiqueta="Observaciones abiertas" valor={abiertas} />
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1 rounded-lg mb-6">
            <TabsTrigger value="lecciones" className="flex-1 min-w-[140px]" data-testid="contenido-tab-lecciones">
              Lecciones y observaciones
              {abiertas > 0 && <span className="ml-1.5 rounded-full bg-orange-600 text-white text-[11px] px-1.5 leading-5">{abiertas}</span>}
            </TabsTrigger>
            <TabsTrigger value="examen" className="flex-1 min-w-[140px]" data-testid="contenido-tab-examen">Análisis del examen</TabsTrigger>
            <TabsTrigger value="escritas" className="flex-1 min-w-[140px]" data-testid="contenido-tab-escritas">Preguntas escritas</TabsTrigger>
            <TabsTrigger value="repaso" className="flex-1 min-w-[140px]" data-testid="contenido-tab-repaso">Repaso</TabsTrigger>
          </TabsList>
          <TabsContent value="lecciones"><Lecciones d={d} /></TabsContent>
          <TabsContent value="examen">{tab === "examen" && <Analisis d={d} />}</TabsContent>
          <TabsContent value="escritas">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Si la revisión cambia seguido la nota del corrector, a la clave le faltan formas de decir las ideas; si la marca seguido para revisar, la pregunta puede estar poco clara.
              </p>
              {d.escritas.map((e) => <TarjetaEscrita key={e.id} e={e} puedeBanco={d.puede.banco} />)}
            </div>
          </TabsContent>
          <TabsContent value="repaso">{tab === "repaso" && <Repaso d={d} />}</TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
