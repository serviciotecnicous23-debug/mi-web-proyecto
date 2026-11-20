// Las actividades del nivel (server/academia-actividades.ts): en el Nivel 2, las conversaciones de evangelismo y el
// servicio en un ministerio; en el Nivel 3, las horas de práctica, la enseñanza grabada y la consolidación de un nuevo
// creyente; en el Nivel 4, las horas de práctica y el sermón, que se evalúa con la rúbrica; en el Nivel 5, el proyecto
// final con su defensa, y el acompañamiento de 2 personas en su Nivel 1 (que cuenta la academia). El alumno las registra
// aquí y la Administración las confirma.
import { useState } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  CalendarClock, CheckCircle2, Clock, ExternalLink, GraduationCap, HandHeart, HeartHandshake, MessageCircleHeart, Mic, Sprout, Trash2, Undo2, Users, Video,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  APRUEBA_PROYECTO, APRUEBA_SERMON, LIMITES_ACTIVIDAD, MINUTOS_ENSENANZA, MINUTOS_SERMON, PARTES_PLAN, PASOS_CONSOLIDACION, PASOS_MINIMOS,
  PROFESORES_DEFENSA, RESULTADOS_EVANGELISMO, RUBRICA_PROYECTO, RUBRICA_SERMON, cuandoDefensa, detalleAcompanar, horasTexto, tiposDe, type ActividadVista,
  type ActividadesNivel, type PasoConsolidacion, type TipoActividad,
} from "@shared/academia-actividades";
import { borrarActividad, pedirAcompanados, registrarActividad, useActividades } from "@/components/academia/api";
import { BarraAvance } from "@/components/academia/ui";

const hoyLocal = () => new Date().toLocaleDateString("en-CA");
const dia = (s: string) => new Date(`${s}T12:00:00`).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" });
const TEXTO_PASO = new Map<string, string>(PASOS_CONSOLIDACION.map((p) => [p.id, p.texto]));
const sitioDe = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

function Estado({ a }: { a: ActividadVista }) {
  if (a.estado === "confirmada") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
        <CheckCircle2 className="w-3.5 h-3.5" /> {a.tipo === "ensenanza" ? "Aprobada" : a.tipo === "sermon" || a.tipo === "proyecto" ? "Aprobado" : "Confirmada"}
      </span>
    );
  }
  if (a.estado === "rechazada") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs bg-red-500/15 text-red-700 dark:text-red-300">
        <Undo2 className="w-3.5 h-3.5" /> {a.tipo === "sermon" || a.tipo === "proyecto" ? (a.nota != null ? "Evaluado: no alcanzó" : "Devuelto") : "Devuelta"}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs bg-amber-500/15 text-amber-700 dark:text-amber-300">
      <Clock className="w-3.5 h-3.5" />{" "}
      {a.tipo === "proyecto"
        ? a.defensa
          ? "Defensa programada"
          : "Por programar la defensa"
        : a.tipo === "sermon"
          ? "Por evaluar"
          : a.tipo === "ensenanza"
            ? "Por revisar"
            : "Por confirmar"}
    </span>
  );
}

/** La defensa del proyecto final: cuándo, dónde y ante quiénes; después, la nota de cada profesor y el promedio. */
function DefensaProyecto({ a }: { a: ActividadVista }) {
  const d = a.defensa;
  if (!d) return null;
  return (
    <div className="rounded-lg bg-muted/50 p-3 text-sm space-y-1.5" data-testid="proyecto-defensa">
      <p className="flex items-start gap-1.5">
        <CalendarClock className="w-4 h-4 mt-0.5 text-orange-500 shrink-0" />
        <span>
          Defensa {cuandoDefensa(d)}, {d.lugar ? `en ${d.lugar}` : "en línea"}, ante {d.profesores.join(" y ")}.
          {d.enlace && (
            <>
              {" "}
              <a href={d.enlace} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-orange-700 dark:text-orange-300 hover:underline">
                <ExternalLink className="w-3.5 h-3.5" /> Entrar a la reunión ({sitioDe(d.enlace)})
              </a>
            </>
          )}
        </span>
      </p>
      {d.evaluaciones && a.nota != null && (
        <>
          <p className="font-semibold">
            {a.nota} de 100 {a.nota >= APRUEBA_PROYECTO ? "· aprobado" : `· se aprueba con ${APRUEBA_PROYECTO}`}
            <span className="font-normal text-muted-foreground"> · el promedio de los dos profesores</span>
          </p>
          {d.evaluaciones.map((e) => (
            <div key={e.evaluador}>
              <p className="text-xs text-muted-foreground">{e.evaluador}: {e.nota} de 100</p>
              <ul className="flex flex-wrap gap-1.5 mt-1">
                {RUBRICA_PROYECTO.map((c) => <li key={c.id} className="rounded-full bg-background/60 px-2.5 py-0.5 text-xs">{c.corto}: {e.rubrica[c.id]} de {c.max}</li>)}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

/** La nota del sermón con los puntos de cada criterio de la rúbrica. */
function NotaSermon({ a }: { a: ActividadVista }) {
  if (a.nota == null || !a.evaluacion) return null;
  return (
    <div className="rounded-lg bg-muted/50 p-3 text-sm space-y-1.5" data-testid="sermon-nota">
      <p className="font-semibold">
        {a.nota} de 100 {a.nota >= APRUEBA_SERMON ? "· aprobado" : `· se aprueba con ${APRUEBA_SERMON}`}
        <span className="font-normal text-muted-foreground"> · evaluó {a.evaluacion.evaluador}</span>
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {RUBRICA_SERMON.map((c) => (
          <li key={c.id} className="rounded-full bg-background/60 px-2.5 py-0.5 text-xs">{c.corto}: {a.evaluacion!.rubrica[c.id]} de {c.max}</li>
        ))}
      </ul>
    </div>
  );
}

/** La primera línea de cada actividad registrada. */
function encabezado(a: ActividadVista): string {
  const periodo = `${dia(a.fecha)}${a.hasta ? ` al ${dia(a.hasta)}` : ""}`;
  switch (a.tipo) {
    case "servicio":
      return `${a.lugar} · desde el ${dia(a.fecha)}${a.hasta ? ` hasta el ${dia(a.hasta)}` : ""}`;
    case "practica":
      return `${a.lugar} · ${periodo} · ${horasTexto(a.horas ?? 0)} ${a.horas === 1 ? "hora" : "horas"}`;
    case "ensenanza":
      return `${a.titulo} · ${dia(a.fecha)}`;
    case "consolidacion":
      return `${a.persona} · desde el ${dia(a.fecha)}${a.hasta ? ` hasta el ${dia(a.hasta)}` : ""}`;
    case "sermon":
      return `${a.titulo} · ${dia(a.fecha)}`;
    case "proyecto":
      return `${a.titulo} · terminado el ${dia(a.fecha)}`;
    default:
      return `${a.persona} · ${dia(a.fecha)}`;
  }
}

function Registrada({ a, alBorrar }: { a: ActividadVista; alBorrar: (id: number) => void }) {
  return (
    <li className="rounded-xl border border-border p-3.5 space-y-1.5" data-testid="actividad" data-tipo={a.tipo} data-estado={a.estado}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold">{encabezado(a)}</p>
        <Estado a={a} />
      </div>
      {a.tipo === "servicio" && <p className="text-xs text-muted-foreground">Líder: {a.lider}</p>}
      {a.tipo === "practica" && <p className="text-xs text-muted-foreground">Supervisó: {a.lider}</p>}
      {a.tipo === "consolidacion" && <p className="text-xs text-muted-foreground">Coordinó: {a.lider}</p>}
      {a.tipo === "evangelismo" && a.resultado && <p className="text-xs text-muted-foreground">{a.resultado}</p>}
      {a.tipo === "sermon" && (
        <p className="text-xs text-muted-foreground">
          {a.lider ? `En vivo${a.lugar ? ` en ${a.lugar}` : ""} · lo escuchó ${a.lider}` : `Grabado${a.lugar ? ` · ${a.lugar}` : ""}`}
          {a.enlace && (
            <>
              {" · "}
              <a href={a.enlace} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-orange-700 dark:text-orange-300 hover:underline">
                <ExternalLink className="w-3.5 h-3.5" /> Ver la grabación ({sitioDe(a.enlace)})
              </a>
            </>
          )}
        </p>
      )}
      {a.tipo === "sermon" && <NotaSermon a={a} />}
      {a.tipo === "proyecto" && (
        <p className="text-xs text-muted-foreground">
          Lo revisó: {a.lider}
          {a.enlace && (
            <>
              {" · "}
              <a href={a.enlace} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-orange-700 dark:text-orange-300 hover:underline">
                <ExternalLink className="w-3.5 h-3.5" /> Ver el plan ({sitioDe(a.enlace)})
              </a>
            </>
          )}
        </p>
      )}
      {a.tipo === "proyecto" && <DefensaProyecto a={a} />}
      {a.tipo === "ensenanza" && a.enlace && (
        <p className="text-xs">
          <a href={a.enlace} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-orange-700 dark:text-orange-300 hover:underline">
            <ExternalLink className="w-3.5 h-3.5" /> Ver la grabación ({sitioDe(a.enlace)})
          </a>
          {a.lugar && <span className="text-muted-foreground"> · {a.lugar}</span>}
        </p>
      )}
      {a.tipo === "consolidacion" && a.pasos && a.pasos.length > 0 && (
        <ul className="flex flex-wrap gap-1.5" aria-label="Pasos que acompañó">
          {a.pasos.map((p) => <li key={p} className="rounded-full bg-muted px-2.5 py-0.5 text-xs">{TEXTO_PASO.get(p) ?? p}</li>)}
        </ul>
      )}
      <p className="text-sm text-muted-foreground whitespace-pre-line">{a.detalle}</p>
      {a.estado === "rechazada" && a.motivo && <p className="text-sm text-red-700 dark:text-red-300">Motivo: {a.motivo}</p>}
      {a.estado === "confirmada" && a.motivo && <p className="text-sm text-emerald-700 dark:text-emerald-300">Nota: {a.motivo}</p>}
      {a.estado !== "confirmada" && (
        <button type="button" onClick={() => alBorrar(a.id)} className="text-xs text-muted-foreground hover:text-red-600 inline-flex items-center gap-1" data-testid="actividad-borrar">
          <Trash2 className="w-3.5 h-3.5" /> Borrar
        </button>
      )}
    </li>
  );
}

/** Lo que dice el campo del detalle y el botón de cada formulario. */
const FORMULARIO: Record<TipoActividad, { detalle: string; boton: string; listo: string }> = {
  evangelismo: { detalle: "De qué hablaron y cómo fue", boton: "Registrar la conversación", listo: "Conversación registrada" },
  servicio: { detalle: "Qué haces en ese ministerio", boton: "Registrar mi servicio", listo: "Servicio registrado" },
  practica: { detalle: "Qué hiciste en la práctica", boton: "Registrar la práctica", listo: "Práctica registrada" },
  ensenanza: { detalle: "La idea central y el propósito de tu enseñanza", boton: "Enviar mi enseñanza", listo: "Enseñanza enviada" },
  consolidacion: { detalle: "Cómo fue el acompañamiento", boton: "Registrar la consolidación", listo: "Consolidación registrada" },
  sermon: { detalle: "La idea central y el propósito de tu sermón", boton: "Enviar mi sermón", listo: "Sermón enviado" },
  proyecto: { detalle: "El ministerio del plan y su meta principal", boton: "Entregar mi proyecto", listo: "Proyecto entregado" },
};

function Formulario({ n, tipo, alGuardar }: { n: number; tipo: TipoActividad; alGuardar: (v: ActividadesNivel) => void }) {
  const { toast } = useToast();
  const [fecha, setFecha] = useState(hoyLocal());
  const [hasta, setHasta] = useState("");
  const [persona, setPersona] = useState("");
  const [resultado, setResultado] = useState("");
  const [lugar, setLugar] = useState("");
  const [lider, setLider] = useState("");
  const [horas, setHoras] = useState("");
  const [titulo, setTitulo] = useState("");
  const [enlace, setEnlace] = useState("");
  const [pasos, setPasos] = useState<PasoConsolidacion[]>([]);
  const [modo, setModo] = useState<"grabado" | "vivo">("grabado");
  const [partes, setPartes] = useState(false);
  const [detalle, setDetalle] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const datos = (): Record<string, unknown> => {
    switch (tipo) {
      case "servicio":
        return { tipo, fecha, hasta, lugar, lider, detalle };
      case "practica":
        return { tipo, fecha, hasta, lugar, lider, horas, detalle };
      case "ensenanza":
        return { tipo, fecha, titulo, enlace, lugar, detalle };
      case "consolidacion":
        return { tipo, fecha, hasta, persona, lider, pasos, detalle };
      case "sermon":
        return modo === "vivo" ? { tipo, modo, fecha, titulo, lugar, lider, enlace, detalle } : { tipo, modo, fecha, titulo, lugar, enlace, detalle };
      case "proyecto":
        return { tipo, fecha, titulo, enlace, lider, partes, detalle };
      default:
        return { tipo, fecha, persona, resultado, detalle };
    }
  };
  const enviar = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setOcupado(true);
    setError(null);
    try {
      const v = await registrarActividad(n, datos());
      alGuardar(v);
      toast({ title: FORMULARIO[tipo].listo, description: "La Administración la revisará y te llegará un aviso." });
      setPersona("");
      setResultado("");
      setDetalle("");
      setLugar("");
      setLider("");
      setHasta("");
      setHoras("");
      setTitulo("");
      setEnlace("");
      setPasos([]);
      setPartes(false);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };
  const hoy = hoyLocal();
  const campoFecha = (etiqueta: string) => (
    <label className="block text-sm">
      <span className="font-medium">{etiqueta}</span>
      <Input type="date" value={fecha} max={hoy} onChange={(e) => setFecha(e.target.value)} className="mt-1" data-testid="act-fecha" />
    </label>
  );
  const campoHasta = (etiqueta: string) => (
    <label className="block text-sm">
      <span className="font-medium">{etiqueta}</span>
      <Input type="date" value={hasta} max={hoy} min={fecha} onChange={(e) => setHasta(e.target.value)} className="mt-1" data-testid="act-hasta" />
    </label>
  );
  const campoLider = (etiqueta: string, ayuda: string) => (
    <label className="block text-sm">
      <span className="font-medium">{etiqueta}</span>
      <Input value={lider} onChange={(e) => setLider(e.target.value)} maxLength={LIMITES_ACTIVIDAD.lider} placeholder={ayuda} className="mt-1" data-testid="act-lider" />
    </label>
  );
  return (
    <form onSubmit={enviar} className="space-y-3 rounded-xl bg-muted/40 p-4" data-testid={`form-${tipo}`}>
      {(tipo === "servicio" || tipo === "practica") && (
        <>
          <label className="block text-sm">
            <span className="font-medium">{tipo === "servicio" ? "Ministerio" : "Ministerio o lugar"}</span>
            <Input
              value={lugar}
              onChange={(e) => setLugar(e.target.value)}
              maxLength={LIMITES_ACTIVIDAD.lugar}
              placeholder={tipo === "servicio" ? "Ministerio de niños, alabanza, ujieres…" : "Grupo de jóvenes, visitas a enfermos, escuela dominical…"}
              className="mt-1"
              data-testid="act-lugar"
            />
          </label>
          {tipo === "servicio"
            ? campoLider("Líder del ministerio", "Quién te acompaña en ese servicio")
            : campoLider("Quién te supervisó", "El líder del ministerio o tu pastor")}
          <div className={`grid gap-3 ${tipo === "practica" ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2"}`}>
            {campoFecha(tipo === "servicio" ? "Desde" : "Fecha o desde")}
            {tipo === "servicio" ? (
              <label className="block text-sm">
                <span className="font-medium">Hasta <span className="text-muted-foreground font-normal">(si terminó)</span></span>
                <Input type="date" value={hasta} max={hoy} min={fecha} onChange={(e) => setHasta(e.target.value)} className="mt-1" data-testid="act-hasta" />
              </label>
            ) : (
              campoHasta("Hasta (si fue un período)")
            )}
            {tipo === "practica" && (
              <label className="block text-sm">
                <span className="font-medium">Horas</span>
                <Input inputMode="decimal" value={horas} onChange={(e) => setHoras(e.target.value)} placeholder="2 o 1,5" className="mt-1" data-testid="act-horas" />
              </label>
            )}
          </div>
          {tipo === "practica" && (
            <p className="text-xs text-muted-foreground -mt-1">
              Hasta {LIMITES_ACTIVIDAD.horasDia} horas en un día y {LIMITES_ACTIVIDAD.horasPeriodo} en un período, de media hora en media hora.
            </p>
          )}
        </>
      )}
      {tipo === "evangelismo" && (
        <>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <label className="block text-sm">
              <span className="font-medium">Con quién</span>
              <Input value={persona} onChange={(e) => setPersona(e.target.value)} maxLength={LIMITES_ACTIVIDAD.persona} placeholder="Un compañero de trabajo, mi vecina M. R.…" className="mt-1" data-testid="act-persona" />
            </label>
            {campoFecha("Cuándo")}
          </div>
          <p className="text-xs text-muted-foreground -mt-1">Escribe la relación o sus iniciales, nunca su nombre completo ni sus datos.</p>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Cómo terminó">
            {RESULTADOS_EVANGELISMO.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setResultado(resultado === r ? "" : r)}
                className={`rounded-full border px-3 py-1 text-xs transition ${resultado === r ? "border-orange-500 bg-orange-500/15 text-orange-700 dark:text-orange-300" : "border-border text-muted-foreground"}`}
                aria-pressed={resultado === r}
              >
                {r}
              </button>
            ))}
          </div>
        </>
      )}
      {tipo === "ensenanza" && (
        <>
          <label className="block text-sm">
            <span className="font-medium">El pasaje y el tema</span>
            <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} maxLength={LIMITES_ACTIVIDAD.titulo} placeholder="Juan 4:1-26 · El agua que da vida" className="mt-1" data-testid="act-titulo" />
          </label>
          <label className="block text-sm">
            <span className="font-medium">El enlace de la grabación</span>
            <Input type="url" value={enlace} onChange={(e) => setEnlace(e.target.value)} maxLength={LIMITES_ACTIVIDAD.enlace} placeholder="https://…" className="mt-1" data-testid="act-enlace" />
          </label>
          <p className="text-xs text-muted-foreground -mt-1">
            Súbela donde se pueda ver con el enlace, sin hacerla pública: un video «no listado» de YouTube o un archivo de Google Drive compartido con
            «cualquier persona que tenga el enlace», por ejemplo.
          </p>
          <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
            {campoFecha("Cuándo la grabaste")}
            <label className="block text-sm">
              <span className="font-medium">Dónde la diste <span className="text-muted-foreground font-normal">(si fue ante un grupo)</span></span>
              <Input value={lugar} onChange={(e) => setLugar(e.target.value)} maxLength={LIMITES_ACTIVIDAD.lugar} placeholder="Grupo de jóvenes, célula, escuela dominical…" className="mt-1" data-testid="act-lugar" />
            </label>
          </div>
        </>
      )}
      {tipo === "sermon" && (
        <>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Cómo lo presentas">
            {(["grabado", "vivo"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setModo(m)}
                className={`rounded-full border px-3 py-1 text-xs transition ${modo === m ? "border-orange-500 bg-orange-500/15 text-orange-700 dark:text-orange-300" : "border-border text-muted-foreground"}`}
                aria-pressed={modo === m}
                data-testid={`act-modo-${m}`}
              >
                {m === "grabado" ? "Grabado, con su enlace" : "En vivo, ante un maestro de la academia"}
              </button>
            ))}
          </div>
          <label className="block text-sm">
            <span className="font-medium">El pasaje y el tema</span>
            <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} maxLength={LIMITES_ACTIVIDAD.titulo} placeholder="Romanos 5:1-11 · La paz con Dios" className="mt-1" data-testid="act-titulo" />
          </label>
          <label className="block text-sm">
            <span className="font-medium">El enlace de la grabación {modo === "vivo" && <span className="text-muted-foreground font-normal">(si lo grabaste)</span>}</span>
            <Input type="url" value={enlace} onChange={(e) => setEnlace(e.target.value)} maxLength={LIMITES_ACTIVIDAD.enlace} placeholder="https://…" className="mt-1" data-testid="act-enlace" />
          </label>
          {modo === "grabado" && (
            <p className="text-xs text-muted-foreground -mt-1">
              El sermón completo, sin cortes, de {MINUTOS_SERMON.min} a {MINUTOS_SERMON.max} minutos: un video «no listado» de YouTube o un archivo de Google Drive
              compartido con «cualquier persona que tenga el enlace», por ejemplo.
            </p>
          )}
          <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
            {campoFecha(modo === "vivo" ? "Cuándo lo predicaste" : "Cuándo lo grabaste")}
            <label className="block text-sm">
              <span className="font-medium">Dónde lo predicaste {modo === "grabado" && <span className="text-muted-foreground font-normal">(si fue ante una congregación)</span>}</span>
              <Input value={lugar} onChange={(e) => setLugar(e.target.value)} maxLength={LIMITES_ACTIVIDAD.lugar} placeholder="Mi iglesia, culto del domingo…" className="mt-1" data-testid="act-lugar" />
            </label>
          </div>
          {modo === "vivo" && campoLider("Qué maestro de la academia lo escuchó", "Su nombre")}
        </>
      )}
      {tipo === "proyecto" && (
        <>
          <label className="block text-sm">
            <span className="font-medium">El nombre de tu plan de ministerio</span>
            <Input value={titulo} onChange={(e) => setTitulo(e.target.value)} maxLength={LIMITES_ACTIVIDAD.titulo} placeholder="Plan de discipulado de jóvenes 2027" className="mt-1" data-testid="act-titulo" />
          </label>
          <label className="block text-sm">
            <span className="font-medium">El enlace del plan escrito</span>
            <Input type="url" value={enlace} onChange={(e) => setEnlace(e.target.value)} maxLength={LIMITES_ACTIVIDAD.enlace} placeholder="https://…" className="mt-1" data-testid="act-enlace" />
          </label>
          <p className="text-xs text-muted-foreground -mt-1">
            Un documento de Google o un PDF compartido con «cualquier persona que tenga el enlace», por ejemplo, para que los profesores lo lean antes de la
            defensa.
          </p>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            {campoLider("Con quién lo revisaste", "Tu pastor o tu mentor")}
            {campoFecha("Cuándo lo terminaste")}
          </div>
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" checked={partes} onChange={(e) => setPartes(e.target.checked)} className="mt-0.5 h-4 w-4 accent-orange-600" data-testid="act-partes" />
            <span>Mi plan tiene sus {PARTES_PLAN.length} partes: {PARTES_PLAN.map((x) => x.charAt(0).toLowerCase() + x.slice(1)).join(", ")}.</span>
          </label>
        </>
      )}
      {tipo === "consolidacion" && (
        <>
          <label className="block text-sm">
            <span className="font-medium">A quién acompañaste</span>
            <Input value={persona} onChange={(e) => setPersona(e.target.value)} maxLength={LIMITES_ACTIVIDAD.persona} placeholder="Un joven de la célula, mi vecino J. P.…" className="mt-1" data-testid="act-persona" />
          </label>
          <p className="text-xs text-muted-foreground -mt-1">Escribe la relación o sus iniciales, nunca su nombre completo ni sus datos.</p>
          {campoLider("Quién lo coordinó en tu iglesia", "Tu pastor o el líder de consolidación")}
          <div className="grid grid-cols-2 gap-3">
            {campoFecha("Desde")}
            {campoHasta("Hasta (si terminó)")}
          </div>
          <fieldset className="space-y-1.5">
            <legend className="text-sm font-medium">Los pasos que acompañaste <span className="text-muted-foreground font-normal">(al menos {PASOS_MINIMOS})</span></legend>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {PASOS_CONSOLIDACION.map((p) => (
                <label key={p.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={pasos.includes(p.id)}
                    onChange={(e) => setPasos(e.target.checked ? [...pasos, p.id] : pasos.filter((x) => x !== p.id))}
                    className="h-4 w-4 accent-orange-600"
                    data-testid={`act-paso-${p.id}`}
                  />
                  {p.texto}
                </label>
              ))}
            </div>
          </fieldset>
        </>
      )}
      <label className="block text-sm">
        <span className="font-medium">{FORMULARIO[tipo].detalle}</span>
        <Textarea value={detalle} onChange={(e) => setDetalle(e.target.value)} maxLength={LIMITES_ACTIVIDAD.detalleMax} rows={3} className="mt-1" data-testid="act-detalle" />
        <span className={`block text-xs mt-1 ${detalle.trim().length < LIMITES_ACTIVIDAD.detalleMin ? "text-muted-foreground" : "text-emerald-700 dark:text-emerald-300"}`}>
          {detalle.trim().length} / al menos {LIMITES_ACTIVIDAD.detalleMin} letras
        </span>
      </label>
      {error && <p className="text-sm text-orange-700 dark:text-orange-300" role="alert">{error}</p>}
      <Button type="submit" className="fire-btn-primary" disabled={ocupado} data-testid={`act-registrar-${tipo}`}>
        {FORMULARIO[tipo].boton}
      </Button>
    </form>
  );
}

/** Cada sección: su título, lo que pide, cómo va y si se puede registrar otra. */
function Seccion(props: {
  tipo: TipoActividad;
  icono: LucideIcon;
  titulo: string;
  explica: string;
  avance: React.ReactNode;
  v: ActividadesNivel;
  abierto: TipoActividad | null;
  abrir: (t: TipoActividad) => void;
  guardar: (v: ActividadesNivel) => void;
  borrar: (id: number) => void;
  /** ¿Se puede registrar otra? (la enseñanza y la consolidación, una a la vez) */
  otra: boolean;
  abrirTexto: string;
}) {
  const { tipo, v } = props;
  const lista = v.lista.filter((a) => a.tipo === tipo);
  const Icono = props.icono;
  return (
    <div className="space-y-3" data-testid={`seccion-${tipo}`}>
      <h3 className="font-semibold text-lg flex items-center gap-2"><Icono className="w-5 h-5 text-orange-500" /> {props.titulo}</h3>
      <p className="text-sm text-muted-foreground">{props.explica}</p>
      {props.avance}
      {lista.length > 0 && <ul className="space-y-2">{lista.map((a) => <Registrada key={a.id} a={a} alBorrar={props.borrar} />)}</ul>}
      {v.puedeRegistrar && props.otra && (props.abierto === tipo ? (
        <Formulario n={v.nivel} tipo={tipo} alGuardar={props.guardar} />
      ) : (
        <Button variant="outline" onClick={() => props.abrir(tipo)} data-testid={`act-abrir-${tipo}`}>{props.abrirTexto}</Button>
      ))}
    </div>
  );
}

const INTRO: Record<number, string> = {
  2: "Lo que aprendes se vive: este nivel pide compartir tu fe y servir en tu iglesia.",
  3: "Lo que aprendes se vive: este nivel pide práctica ministerial en tu iglesia, una enseñanza grabada y acompañar a un nuevo creyente.",
  4: "Lo que aprendes se vive: este nivel pide práctica ministerial en tu iglesia y predicar un sermón que un maestro de la academia evalúa con la rúbrica.",
  5: "Lo que aprendes se vive: este nivel pide presentar y defender tu plan de ministerio, y acompañar a dos personas mientras hacen el Nivel 1.",
};

/** Nivel 5: acompañar como mentor a personas en su Nivel 1. No se registra: lo cuenta la academia con los mentores. */
function Acompanar({ v }: { v: ActividadesNivel }) {
  const { toast } = useToast();
  const [ocupado, setOcupado] = useState(false);
  const pide = v.pide.acompanar ?? 0;
  const pedir = async () => {
    setOcupado(true);
    try {
      await pedirAcompanados(v.nivel);
      toast({ title: "Pedido enviado", description: "La Administración te elegirá como mentor de personas que empiezan el Nivel 1; te llegará un aviso." });
    } catch (e: any) {
      toast({ title: "No se pudo enviar", description: e.message, variant: "destructive" });
    } finally {
      setOcupado(false);
    }
  };
  return (
    <div className="space-y-3" data-testid="seccion-acompanar">
      <h3 className="font-semibold text-lg flex items-center gap-2"><Users className="w-5 h-5 text-orange-500" /> Acompañar a {pide} personas en su Nivel 1</h3>
      <p className="text-sm text-muted-foreground">
        La Administración te elige como mentor de personas que empiezan el Nivel 1. Acompáñalas en sus estudios, ora por ellas y anímalas: cuenta cada una
        que termina el Nivel 1 mientras la acompañas. No hace falta registrar nada.
      </p>
      <div className="max-w-md" data-testid="acompanar-estado">
        <BarraAvance valor={Math.min(v.acompanar.terminaron, pide)} de={pide} etiqueta={detalleAcompanar(v)} />
      </div>
      <div className="flex flex-wrap gap-2">
        {(v.acompanar.terminaron > 0 || v.acompanar.enCurso > 0) && (
          <Button asChild variant="outline"><Link href="/academia/acompanados">Ver a quienes acompañas</Link></Button>
        )}
        {v.puedeRegistrar && !v.acompanar.hecho && (
          <Button variant="outline" disabled={ocupado} onClick={pedir} data-testid="acompanar-pedir">Pedir a quién acompañar</Button>
        )}
      </div>
    </div>
  );
}

export function ActividadesDelNivel({ n }: { n: number }) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const q = useActividades(n);
  const [abierto, setAbierto] = useState<TipoActividad | null>(null);
  if (q.isLoading) return <section className="glass-card p-5 md:p-6 text-muted-foreground">Cargando tus actividades…</section>;
  if (!q.data) {
    return (
      <section className="glass-card p-5 md:p-6" data-testid="nivel-actividades">
        <h2 className="font-display text-2xl font-bold">Actividades del nivel</h2>
        <p className="text-muted-foreground mt-2">{q.error?.message ?? "No se pudieron cargar tus actividades."}</p>
      </section>
    );
  }
  const v = q.data;
  const guardar = (nuevo: ActividadesNivel) => {
    qc.setQueryData(["academia", "actividades", n], nuevo);
    void qc.invalidateQueries({ queryKey: ["academia", "nivel"] });
    setAbierto(null);
  };
  const borrar = async (id: number) => {
    if (!window.confirm("¿Borrar esta actividad?")) return;
    try {
      const nuevo = await borrarActividad(id);
      qc.setQueryData(["academia", "actividades", n], nuevo);
      void qc.invalidateQueries({ queryKey: ["academia", "nivel"] });
    } catch (e: any) {
      toast({ title: "No se pudo borrar", description: e.message, variant: "destructive" });
    }
  };
  const comun = { v, abierto, abrir: setAbierto, guardar, borrar };
  const tipos = tiposDe(v.pide);
  const pideEv = v.pide.evangelismo ?? 0;
  const pideHoras = v.pide.practicaHoras ?? 0;
  return (
    <section className="glass-card p-5 md:p-6 space-y-6" data-testid="nivel-actividades">
      <div>
        <h2 className="font-display text-2xl font-bold">Actividades del nivel</h2>
        <p className="text-muted-foreground mt-1 text-[15px]">
          {INTRO[n] ?? "Lo que aprendes se vive."} Registra cada actividad; la Administración la confirma y te llega un aviso.
        </p>
        {!v.puedeRegistrar && v.motivo && <p className="mt-3 text-sm text-orange-700 dark:text-orange-300" data-testid="actividades-cerradas">{v.motivo}</p>}
      </div>

      {tipos.includes("evangelismo") && (
        <Seccion
          {...comun}
          tipo="evangelismo"
          icono={MessageCircleHeart}
          titulo="Conversaciones de evangelismo"
          explica={`${pideEv} conversaciones en las que compartiste el evangelio, como aprendiste en Evangelismo personal: con quién, cuándo y cómo fue.`}
          avance={
            <div className="max-w-md">
              <BarraAvance
                valor={Math.min(v.evangelismo.confirmadas, pideEv)}
                de={pideEv}
                etiqueta={`${Math.min(v.evangelismo.confirmadas, pideEv)} de ${pideEv} confirmadas${v.evangelismo.pendientes ? ` · ${v.evangelismo.pendientes} por confirmar` : ""}`}
              />
            </div>
          }
          otra
          abrirTexto="Registrar una conversación"
        />
      )}

      {tipos.includes("servicio") && (
        <Seccion
          {...comun}
          tipo="servicio"
          icono={HandHeart}
          titulo="Servicio en un ministerio"
          explica={`Sirve al menos un mes (${v.pide.servicioDias} días) en un ministerio de tu iglesia. Registra dónde, con qué líder y desde cuándo; cuenta cuando la Administración lo confirma y se cumplen los días.`}
          avance={
            <p className="text-sm font-medium" data-testid="servicio-estado">
              {v.servicio.hecho
                ? "Cumplido: servicio confirmado."
                : v.servicio.confirmado
                  ? `Confirmado · ${v.servicio.dias ?? 0} de ${v.pide.servicioDias} días`
                  : v.servicio.pendiente
                    ? "Registrado · por confirmar"
                    : "Todavía sin registrar"}
            </p>
          }
          otra={!v.servicio.hecho}
          abrirTexto="Registrar mi servicio"
        />
      )}

      {tipos.includes("practica") && (
        <Seccion
          {...comun}
          tipo="practica"
          icono={HeartHandshake}
          titulo="Práctica ministerial"
          explica={`${pideHoras} horas sirviendo en tu iglesia con un líder que te supervise: enseñar una clase, dirigir un grupo, visitar enfermos, evangelizar o acompañar a otros. Registra cada día o cada período con sus horas; cuentan las horas que la Administración confirma con ese líder.`}
          avance={
            <div className="max-w-md" data-testid="practica-estado">
              <BarraAvance
                valor={Math.min(v.practica.horas, pideHoras)}
                de={pideHoras}
                etiqueta={`${horasTexto(Math.min(v.practica.horas, pideHoras))} de ${pideHoras} horas confirmadas${v.practica.porConfirmar ? ` · ${horasTexto(v.practica.porConfirmar)} por confirmar` : ""}`}
              />
            </div>
          }
          otra={!v.practica.hecho}
          abrirTexto="Registrar horas de práctica"
        />
      )}

      {tipos.includes("ensenanza") && (
        <Seccion
          {...comun}
          tipo="ensenanza"
          icono={Video}
          titulo="Enseñanza grabada"
          explica={`Una enseñanza de ${MINUTOS_ENSENANZA.min} a ${MINUTOS_ENSENANZA.max} minutos preparada con los pasos de Homilética I: el pasaje, la idea central, el propósito, el bosquejo, la ilustración y la aplicación. Grábala, comparte el enlace y la Administración la aprueba o te dice qué mejorar.`}
          avance={
            <p className="text-sm font-medium" data-testid="ensenanza-estado">
              {v.ensenanza.hecho ? "Cumplido: enseñanza aprobada." : v.ensenanza.pendientes ? "Enviada · por revisar" : v.ensenanza.devueltas ? "Devuelta: corrígela y envíala otra vez." : "Todavía sin enviar"}
            </p>
          }
          otra={!v.ensenanza.hecho && !v.ensenanza.pendientes}
          abrirTexto={v.ensenanza.devueltas ? "Enviar otra vez mi enseñanza" : "Enviar mi enseñanza"}
        />
      )}

      {tipos.includes("consolidacion") && (
        <Seccion
          {...comun}
          tipo="consolidacion"
          icono={Sprout}
          titulo="Consolidar a un nuevo creyente"
          explica={`Acompaña a un nuevo creyente en los pasos del plan de consolidación que aprendiste en Evangelismo y consolidación, en coordinación con tu iglesia: al menos ${PASOS_MINIMOS} de los ${PASOS_CONSOLIDACION.length}. La Administración lo confirma con quien lo coordinó.`}
          avance={
            <p className="text-sm font-medium" data-testid="consolidacion-estado">
              {v.consolidacion.hecho
                ? "Cumplido: consolidación confirmada."
                : v.consolidacion.pendientes
                  ? "Registrada · por confirmar"
                  : v.consolidacion.devueltas
                    ? "Devuelta: corrígela y regístrala otra vez."
                    : "Todavía sin registrar"}
            </p>
          }
          otra={!v.consolidacion.hecho && !v.consolidacion.pendientes}
          abrirTexto="Registrar la consolidación"
        />
      )}

      {tipos.includes("sermon") && (
        <Seccion
          {...comun}
          tipo="sermon"
          icono={Mic}
          titulo="Sermón evaluado con rúbrica"
          explica={`Un sermón de ${MINUTOS_SERMON.min} a ${MINUTOS_SERMON.max} minutos sobre un pasaje, preparado con Homilética II. Preséntalo grabado, con su enlace, o en vivo, ante un maestro de la academia. Un maestro lo evalúa con esta rúbrica de 100 puntos y se aprueba con ${APRUEBA_SERMON}; si no llega, recibes tu nota y lo que debes mejorar, y lo preparas otra vez.`}
          avance={
            <>
              <ul className="grid gap-1 text-sm sm:grid-cols-2" aria-label="La rúbrica del sermón">
                {RUBRICA_SERMON.map((c) => (
                  <li key={c.id} className="flex justify-between gap-3 rounded-lg bg-muted/40 px-3 py-1.5">
                    <span>{c.corto}</span>
                    <span className="text-muted-foreground tabular-nums">{c.max}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm font-medium" data-testid="sermon-estado">
                {v.sermon.hecho
                  ? `Cumplido: sermón aprobado${v.sermon.nota != null ? ` con ${v.sermon.nota}` : ""}.`
                  : v.sermon.pendientes
                    ? "Enviado · por evaluar"
                    : v.sermon.devueltas
                      ? v.sermon.nota != null
                        ? `Evaluado con ${v.sermon.nota}: prepáralo otra vez con lo que debes mejorar.`
                        : "Devuelto: corrígelo y envíalo otra vez."
                      : "Todavía sin enviar"}
              </p>
            </>
          }
          otra={!v.sermon.hecho && !v.sermon.pendientes}
          abrirTexto={v.sermon.devueltas ? "Enviar otra vez mi sermón" : "Enviar mi sermón"}
        />
      )}

      {tipos.includes("proyecto") && (
        <Seccion
          {...comun}
          tipo="proyecto"
          icono={GraduationCap}
          titulo="Proyecto final con defensa en vivo"
          explica={`Tu plan de ministerio, con las ${PARTES_PLAN.length} partes que aprendiste en Seminario de liderazgo ministerial, escrito con tu pastor o tu mentor. Entrégalo con su enlace; la Administración programa la defensa en vivo, en persona o en línea, ante ${PROFESORES_DEFENSA} profesores. Cada uno lo evalúa con esta rúbrica de 100 puntos; la nota es el promedio de los dos y se aprueba con ${APRUEBA_PROYECTO}.`}
          avance={
            <>
              <ul className="flex flex-wrap gap-1.5" aria-label="Las partes del plan">
                {PARTES_PLAN.map((x) => <li key={x} className="rounded-full bg-muted px-2.5 py-0.5 text-xs">{x}</li>)}
              </ul>
              <ul className="grid gap-1 text-sm sm:grid-cols-2" aria-label="La rúbrica del proyecto">
                {RUBRICA_PROYECTO.map((c) => (
                  <li key={c.id} className="flex justify-between gap-3 rounded-lg bg-muted/40 px-3 py-1.5">
                    <span>{c.corto}</span>
                    <span className="text-muted-foreground tabular-nums">{c.max}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm font-medium" data-testid="proyecto-estado">
                {v.proyecto.hecho
                  ? `Cumplido: proyecto aprobado${v.proyecto.nota != null ? ` con ${v.proyecto.nota}` : ""}.`
                  : v.proyecto.pendientes
                    ? v.proyecto.defensa
                      ? `Defensa ${cuandoDefensa(v.proyecto.defensa)}.`
                      : "Entregado · la Administración programará la defensa."
                    : v.proyecto.devueltas
                      ? v.proyecto.nota != null
                        ? `Evaluado con ${v.proyecto.nota}: mejóralo y entrégalo otra vez para una nueva defensa.`
                        : "Devuelto: corrígelo y entrégalo otra vez."
                      : "Todavía sin entregar"}
              </p>
            </>
          }
          otra={!v.proyecto.hecho && !v.proyecto.pendientes}
          abrirTexto={v.proyecto.devueltas ? "Entregar otra vez mi proyecto" : "Entregar mi proyecto"}
        />
      )}

      {(v.pide.acompanar ?? 0) > 0 && <Acompanar v={v} />}
    </section>
  );
}
