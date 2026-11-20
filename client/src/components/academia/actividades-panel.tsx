// «Para revisar» de la Administración: las actividades del nivel que los alumnos registraron (en el Nivel 2, las
// conversaciones de evangelismo y los servicios; en el Nivel 3, la práctica, la enseñanza grabada y la consolidación; en
// el Nivel 4, la práctica y el sermón, que se evalúa con la rúbrica). Se confirman o se devuelven con un motivo; el
// alumno recibe un aviso. Nadie confirma lo suyo.
import { useState } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, ExternalLink, HandHeart, HeartHandshake, MessageCircleHeart, Mic, Sprout, Undo2, Video, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  APRUEBA_SERMON, NOMBRE_ACTIVIDAD, PASOS_CONSOLIDACION, PAUTAS_ENSENANZA, RUBRICA_SERMON, horasDe, horasTexto, type ActividadRevision, type TipoActividad,
} from "@shared/academia-actividades";
import { revisarActividad, useActividadesPanel, type RevisionActividad } from "@/components/academia/api";
import { hace } from "@/components/academia/seguimiento";
import { useArea } from "@/components/academia/area";

const dia = (s: string) => new Date(`${s}T12:00:00`).toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" });
const ICONO: Record<TipoActividad, LucideIcon> = {
  evangelismo: MessageCircleHeart,
  servicio: HandHeart,
  practica: HeartHandshake,
  ensenanza: Video,
  consolidacion: Sprout,
  sermon: Mic,
};
const TEXTO_PASO = new Map<string, string>(PASOS_CONSOLIDACION.map((p) => [p.id, p.texto]));
const sitioDe = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

function Dato({ t, children }: { t: string; children: React.ReactNode }) {
  return <div><dt className="inline text-muted-foreground">{t}: </dt><dd className="inline">{children}</dd></div>;
}

function Datos({ a }: { a: ActividadRevision }) {
  switch (a.tipo) {
    case "servicio":
      return (
        <>
          <Dato t="Ministerio">{a.lugar}</Dato>
          <Dato t="Líder">{a.lider}</Dato>
          <Dato t="Desde">{dia(a.fecha)}{a.hasta ? ` hasta el ${dia(a.hasta)}` : " (sigue sirviendo)"}</Dato>
        </>
      );
    case "practica":
      return (
        <>
          <Dato t="Ministerio o lugar">{a.lugar}</Dato>
          <Dato t="Supervisó">{a.lider}</Dato>
          <Dato t={a.hasta ? "Período" : "Fecha"}>{dia(a.fecha)}{a.hasta ? ` al ${dia(a.hasta)}` : ""}</Dato>
          <Dato t="Horas">{horasTexto(a.horas ?? 0)}</Dato>
        </>
      );
    case "ensenanza":
      return (
        <>
          <Dato t="Pasaje y tema">{a.titulo}</Dato>
          <Dato t="Grabada">{dia(a.fecha)}{a.lugar ? ` · ${a.lugar}` : ""}</Dato>
          {a.enlace && (
            <Dato t="Grabación">
              <a href={a.enlace} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-orange-700 dark:text-orange-300 hover:underline" data-testid="actividad-enlace">
                Abrir <ExternalLink className="w-3.5 h-3.5" /> <span className="text-muted-foreground">({sitioDe(a.enlace)})</span>
              </a>
            </Dato>
          )}
        </>
      );
    case "sermon":
      return (
        <>
          <Dato t="Pasaje y tema">{a.titulo}</Dato>
          <Dato t={a.lider ? "Predicado en vivo" : "Grabado"}>{dia(a.fecha)}{a.lugar ? ` · ${a.lugar}` : ""}</Dato>
          {a.lider && <Dato t="Lo escuchó">{a.lider}</Dato>}
          {a.enlace && (
            <Dato t="Grabación">
              <a href={a.enlace} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-orange-700 dark:text-orange-300 hover:underline" data-testid="actividad-enlace">
                Abrir <ExternalLink className="w-3.5 h-3.5" /> <span className="text-muted-foreground">({sitioDe(a.enlace)})</span>
              </a>
            </Dato>
          )}
          {a.nota != null && <Dato t="Nota">{a.nota} de 100{a.evaluacion ? ` (evaluó ${a.evaluacion.evaluador})` : ""}</Dato>}
        </>
      );
    case "consolidacion":
      return (
        <>
          <Dato t="Acompañó a">{a.persona}</Dato>
          <Dato t="Coordinó">{a.lider}</Dato>
          <Dato t="Desde">{dia(a.fecha)}{a.hasta ? ` hasta el ${dia(a.hasta)}` : " (sigue acompañándolo)"}</Dato>
          {a.pasos && <Dato t="Pasos">{a.pasos.map((p) => TEXTO_PASO.get(p) ?? p).join(" · ")}</Dato>}
        </>
      );
    default:
      return (
        <>
          <Dato t="Con">{a.persona}</Dato>
          <Dato t="Fecha">{dia(a.fecha)}</Dato>
          {a.resultado && <Dato t="Cómo terminó">{a.resultado}</Dato>}
        </>
      );
  }
}

/** La evaluación de un sermón con la rúbrica de Homilética II: los puntos de cada criterio, quién evaluó y qué mejorar. */
function EvaluarSermon({ ocupado, alGuardar }: { ocupado: boolean; alGuardar: (c: RevisionActividad) => void }) {
  const [puntos, setPuntos] = useState<Record<string, string>>({});
  const [evaluador, setEvaluador] = useState("");
  const [comentario, setComentario] = useState("");
  const valores = RUBRICA_SERMON.map((c) => {
    const t = (puntos[c.id] ?? "").trim();
    const v = t === "" ? NaN : Number(t);
    return { c, v, bien: Number.isInteger(v) && v >= 0 && v <= c.max };
  });
  const completa = valores.every((x) => x.bien);
  const total = valores.reduce((s, x) => s + (x.bien ? x.v : 0), 0);
  const aprueba = completa && total >= APRUEBA_SERMON;
  const listo = completa && evaluador.trim().length >= 3 && (aprueba || comentario.trim().length >= 5);
  return (
    <div className="space-y-2.5 rounded-lg bg-muted/50 p-3" data-testid="evaluar-sermon">
      <p className="text-sm font-medium">La rúbrica (se aprueba con {APRUEBA_SERMON} de 100)</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {valores.map(({ c, bien }) => (
          <label key={c.id} className="flex items-center justify-between gap-2 text-sm" title={c.texto}>
            <span>{c.corto}</span>
            <span className="flex items-center gap-1.5">
              <Input
                inputMode="numeric"
                value={puntos[c.id] ?? ""}
                onChange={(e) => setPuntos({ ...puntos, [c.id]: e.target.value })}
                className={`w-16 text-right ${puntos[c.id] && !bien ? "border-red-500" : ""}`}
                aria-label={`${c.corto}, de 0 a ${c.max}`}
                data-testid={`rubrica-${c.id}`}
              />
              <span className="text-muted-foreground tabular-nums">/ {c.max}</span>
            </span>
          </label>
        ))}
      </div>
      <p className="text-sm font-semibold" data-testid="rubrica-total">
        Total: {total} de 100 {completa ? (aprueba ? "· aprobado" : `· no alcanza (${APRUEBA_SERMON})`) : ""}
      </p>
      <Input value={evaluador} onChange={(e) => setEvaluador(e.target.value)} placeholder="Qué maestro de la academia lo evaluó" maxLength={80} data-testid="rubrica-evaluador" />
      <Input
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder={aprueba || !completa ? "Un comentario para el alumno (opcional)" : "Qué debe mejorar (el alumno lo recibe con su nota)"}
        maxLength={400}
        data-testid="rubrica-comentario"
      />
      <Button className="fire-btn-primary" disabled={ocupado || !listo} onClick={() => alGuardar({ accion: "evaluar", motivo: comentario, rubrica: puntos, evaluador })} data-testid="rubrica-guardar">
        Guardar la evaluación
      </Button>
    </div>
  );
}

function TarjetaActividad({ a, puedeRevisar }: { a: ActividadRevision; puedeRevisar: boolean }) {
  const qc = useQueryClient();
  const { base } = useArea();
  const { toast } = useToast();
  const [devolviendo, setDevolviendo] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [horas, setHoras] = useState(a.horas == null ? "" : horasTexto(a.horas));
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const esEnsenanza = a.tipo === "ensenanza";
  const esSermon = a.tipo === "sermon";
  const enviar = async (cuerpo: RevisionActividad) => {
    setOcupado(true);
    setError(null);
    try {
      const r = await revisarActividad(a.id, cuerpo);
      toast({
        title:
          cuerpo.accion === "evaluar"
            ? `Sermón evaluado: ${r.nota} de 100`
            : cuerpo.accion === "confirmar"
              ? esEnsenanza
                ? "Enseñanza aprobada"
                : "Actividad confirmada"
              : "Actividad devuelta",
        description: r.nivelCompleto ? `${a.alumno.nombre} completó el Nivel ${a.nivel}.` : `${a.alumno.nombre} recibe un aviso.`,
      });
      void qc.invalidateQueries({ queryKey: ["academia", "direccion"] });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };
  const decidir = (accion: "confirmar" | "rechazar") =>
    enviar({ accion, motivo: accion === "rechazar" ? motivo : "", ...(accion === "confirmar" && a.tipo === "practica" ? { horas } : {}) });
  const Icono = ICONO[a.tipo] ?? MessageCircleHeart;
  const horasValidas = a.tipo !== "practica" || (() => {
    const h = horasDe(horas);
    return h != null && h <= (a.horas ?? 0);
  })();
  return (
    <article className="glass-card p-5 space-y-2.5" data-testid="tarjeta-actividad" data-actividad={a.id} data-tipo={a.tipo}>
      <header className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold">
            <Link href={`${base}/alumno/${a.alumno.userId}`} className="hover:underline">{a.alumno.nombre}</Link>
            {a.alumno.matricula && <span className="text-xs text-muted-foreground tracking-wider"> · {a.alumno.matricula}</span>}
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Icono className="w-4 h-4 text-orange-500" />
            {NOMBRE_ACTIVIDAD[a.tipo] ?? "Actividad"} · Nivel {a.nivel} · registrada {hace(a.creada)}
          </p>
        </div>
        {a.estado === "confirmada" && (
          <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" /> {esEnsenanza ? "Aprobada" : esSermon ? "Aprobado" : "Confirmada"}
          </span>
        )}
        {a.estado === "rechazada" && (
          <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs bg-red-500/15 text-red-700 dark:text-red-300">
            <Undo2 className="w-3.5 h-3.5" /> {esSermon ? (a.nota != null ? "No alcanzó" : "Devuelto") : "Devuelta"}
          </span>
        )}
      </header>
      <dl className="grid gap-x-4 gap-y-1 text-sm sm:grid-cols-2">
        <Datos a={a} />
      </dl>
      <p className="text-[15px] whitespace-pre-line">{a.detalle}</p>
      {esEnsenanza && a.estado === "pendiente" && (
        <div className="rounded-lg bg-muted/50 p-3 text-sm">
          <p className="font-medium">Para aprobarla, revisa que:</p>
          <ul className="mt-1 list-disc pl-5 text-muted-foreground space-y-0.5">{PAUTAS_ENSENANZA.map((p) => <li key={p}>{p}.</li>)}</ul>
        </div>
      )}
      {a.motivo && a.estado !== "pendiente" && <p className="text-sm text-muted-foreground">Motivo: {a.motivo}</p>}
      {a.estado === "pendiente" && puedeRevisar && (
        devolviendo ? (
          <div className="space-y-2">
            <Input value={motivo} onChange={(e) => setMotivo(e.target.value)} placeholder="Por qué la devuelves (el alumno lo recibe)" maxLength={400} data-testid="actividad-motivo" />
            <div className="flex flex-wrap gap-2">
              <Button variant="destructive" disabled={ocupado || motivo.trim().length < 5} onClick={() => decidir("rechazar")} data-testid="actividad-devolver-enviar">Devolver</Button>
              <Button variant="ghost" onClick={() => setDevolviendo(false)}>Cancelar</Button>
            </div>
          </div>
        ) : esSermon ? (
          <div className="space-y-2">
            <EvaluarSermon ocupado={ocupado} alGuardar={enviar} />
            <Button variant="outline" disabled={ocupado} onClick={() => setDevolviendo(true)} data-testid="actividad-devolver">Devolver sin evaluar (por ejemplo, si el enlace no abre)</Button>
          </div>
        ) : (
          <div className="flex flex-wrap items-end gap-2">
            {a.tipo === "practica" && (
              <label className="text-sm">
                <span className="block text-muted-foreground">Horas que confirmas</span>
                <Input inputMode="decimal" value={horas} onChange={(e) => setHoras(e.target.value)} className="mt-1 w-24" data-testid="actividad-horas" />
              </label>
            )}
            <Button className="fire-btn-primary" disabled={ocupado || !horasValidas} onClick={() => decidir("confirmar")} data-testid="actividad-confirmar">
              {esEnsenanza ? "Aprobar" : "Confirmar"}
            </Button>
            <Button variant="outline" disabled={ocupado} onClick={() => setDevolviendo(true)} data-testid="actividad-devolver">Devolver con un motivo</Button>
          </div>
        )
      )}
      {a.estado === "pendiente" && !puedeRevisar && <p className="text-xs text-muted-foreground">Es tuya: la confirma otro administrador.</p>}
      {error && <p className="text-sm text-orange-700 dark:text-orange-300" role="alert">{error}</p>}
    </article>
  );
}

export function ActividadesPorConfirmar({ ajeno }: { ajeno: (userId: number) => boolean }) {
  const q = useActividadesPanel();
  if (q.isLoading) return <p className="text-muted-foreground">Cargando las actividades…</p>;
  if (!q.data) return <p className="text-sm text-red-600">{q.error?.message ?? "No se pudieron cargar las actividades."}</p>;
  const { pendientes, recientes } = q.data;
  return (
    <>
      <section className="space-y-3" data-testid="actividades-por-confirmar">
        <h3 className="font-display text-xl font-bold">Actividades por confirmar ({pendientes.length})</h3>
        <p className="text-sm text-muted-foreground">
          Lo que piden los niveles además de sus materias: en el Nivel 2, las conversaciones de evangelismo y el servicio (cuenta cuando lo confirmas y se
          cumplen sus 28 días); en el Nivel 3, las horas de práctica, la enseñanza grabada y la consolidación de un nuevo creyente; en el Nivel 4, las horas
          de práctica y el sermón, que se evalúa con la rúbrica de Homilética II (se aprueba con {APRUEBA_SERMON}). Confírmalas si son verdaderas (pregúntale al
          líder que el alumno nombra) o devuélvelas con un motivo. La práctica se puede confirmar con menos horas.
        </p>
        {pendientes.length ? pendientes.map((a) => <TarjetaActividad key={a.id} a={a} puedeRevisar={ajeno(a.alumno.userId)} />) : <p className="text-sm text-muted-foreground">Nada por confirmar.</p>}
      </section>
      {recientes.length > 0 && (
        <section className="space-y-3">
          <h3 className="font-display text-xl font-bold">Actividades revisadas hace poco</h3>
          {recientes.map((a) => <TarjetaActividad key={a.id} a={a} puedeRevisar={false} />)}
        </section>
      )}
    </>
  );
}
