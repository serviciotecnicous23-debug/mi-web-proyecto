// La revisión de la Dirección académica: la tarjeta de una respuesta escrita con su clave (las ideas con su peso, lo que
// encontró el corrector y la respuesta modelo), para confirmar la nota o cambiarla con un motivo (el servidor recalcula
// el examen, la materia y el nivel), y la tarjeta de un pedido de revisión del alumno, con su respuesta.
import { useState } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, CheckCircle2, MessageSquareQuote, PenLine, Send, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { ApelacionItem, ItemRevision } from "@shared/academia-direccion";
import { responderApelacion, revisarEscrita } from "@/components/academia/api";
import { fecha, hace } from "@/components/academia/seguimiento";

const CHIP = "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs whitespace-nowrap";

export function TarjetaRevision({ item, puedeRevisar, conAlumno = true }: { item: ItemRevision; puedeRevisar: boolean; conAlumno?: boolean }) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const efectiva = item.notaFinal ?? item.notaAuto;
  const [cambiando, setCambiando] = useState(false);
  const [nota, setNota] = useState(String(efectiva));
  const [motivo, setMotivo] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [aviso, setAviso] = useState<{ ok: boolean; texto: string } | null>(null);

  const enviar = async (accion: "confirmar" | "cambiar") => {
    setOcupado(true);
    setAviso(null);
    try {
      const r = await revisarEscrita(item.id, accion === "cambiar" ? { accion, nota: Number(nota), motivo } : { accion, motivo: "" });
      setAviso({ ok: true, texto: r.mensaje });
      // la tarjeta puede pasar a otra lista (de «para revisar» a «revisadas»): el resumen queda también en un aviso
      toast({ title: accion === "cambiar" ? `Nota de ${item.alumno.nombre} revisada` : "Nota confirmada", description: r.mensaje });
      setCambiando(false);
      setMotivo("");
      void qc.invalidateQueries({ queryKey: ["academia", "direccion"] });
    } catch (e: any) {
      setAviso({ ok: false, texto: e.message });
    } finally {
      setOcupado(false);
    }
  };

  return (
    <article className="glass-card p-5 space-y-3" data-testid="tarjeta-revision" data-respuesta={item.id}>
      <header className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          {conAlumno && (
            <p className="font-semibold">
              <Link href={`/academia/direccion/alumno/${item.alumno.userId}`} className="hover:underline">{item.alumno.nombre}</Link>
              {item.alumno.matricula && <span className="text-xs text-muted-foreground tracking-wider"> · {item.alumno.matricula}</span>}
            </p>
          )}
          <p className="text-sm text-muted-foreground">{item.examen.titulo} · intento {item.examen.intento} · {hace(item.fecha)}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {item.marcas.map((m) => (
            <span key={m} className={`${CHIP} bg-muted`}><AlertTriangle className="w-3 h-3" aria-hidden="true" /> {m}</span>
          ))}
          {item.apelacion && <span className={`${CHIP} bg-orange-500/15 font-medium`}><MessageSquareQuote className="w-3 h-3" aria-hidden="true" /> Pidió revisión</span>}
        </div>
      </header>

      <p className="font-medium">{item.pregunta}</p>
      <blockquote className="border-l-4 border-orange-500/50 pl-3 text-[15px] italic whitespace-pre-wrap break-words">{item.texto || "(sin respuesta)"}</blockquote>
      <p className="text-xs text-muted-foreground">{item.palabras} palabras</p>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold mb-1">Las ideas de la clave</p>
          <ul className="space-y-1 text-sm">
            {item.ideas.map((i) => (
              <li key={i.texto} className="flex gap-2">
                {i.ok ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" aria-label="La encontró" /> : <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" aria-label="No la encontró" />}
                <span>{i.texto} <span className="text-muted-foreground">({i.peso} puntos)</span></span>
              </li>
            ))}
          </ul>
          {item.errores.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-semibold">Conceptos errados que encontró</p>
              <ul className="text-sm list-disc pl-5">{item.errores.map((e) => <li key={e}>{e}</li>)}</ul>
            </div>
          )}
          {item.citas.length > 0 && <p className="text-xs text-muted-foreground mt-2">Citas de la clave: {item.citas.join(", ")}</p>}
        </div>
        <div>
          <p className="text-sm font-semibold mb-1">Respuesta modelo</p>
          <p className="text-sm text-muted-foreground">{item.modelo}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p className="text-sm">
          Nota del corrector: <strong className="tabular-nums">{item.notaAuto}</strong>
          {item.notaFinal != null && item.notaFinal !== item.notaAuto && <> · Nota revisada: <strong className="tabular-nums">{item.notaFinal}</strong></>}
        </p>
        {item.revision && (
          <p className="text-xs text-muted-foreground">
            Revisada por {item.revision.por} el {fecha(item.revision.fecha)}{item.revision.motivo ? `: «${item.revision.motivo}»` : ""}
          </p>
        )}
      </div>

      {puedeRevisar &&
        (cambiando ? (
          <div className="rounded-xl border border-border p-3 space-y-2">
            <label className="text-sm block">
              Nota nueva, de 0 a 100
              <Input type="number" inputMode="numeric" min={0} max={100} value={nota} onChange={(e) => setNota(e.target.value)} className="h-10 w-28 mt-1 text-[16px]" data-testid="revision-nota" />
            </label>
            <label className="text-sm block">
              Motivo (queda registrado y lo ve el alumno)
              <Textarea value={motivo} onChange={(e) => setMotivo(e.target.value)} rows={2} maxLength={500} className="mt-1 text-[16px]" placeholder="Por ejemplo: expresa la idea del arrepentimiento con otras palabras." data-testid="revision-motivo" />
            </label>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" className="fire-btn-primary" onClick={() => enviar("cambiar")} disabled={ocupado || motivo.trim().length < 8 || nota.trim() === ""} data-testid="revision-guardar">
                {ocupado ? "Guardando…" : "Guardar la nota"}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setCambiando(false)} disabled={ocupado}>Cancelar</Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {!item.revision && (
              <Button size="sm" variant="outline" onClick={() => enviar("confirmar")} disabled={ocupado} data-testid="revision-confirmar">
                <CheckCircle2 className="w-4 h-4 mr-1.5" /> Confirmar la nota ({efectiva})
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={() => setCambiando(true)} disabled={ocupado} data-testid="revision-cambiar">
              <PenLine className="w-4 h-4 mr-1.5" /> Cambiar la nota
            </Button>
          </div>
        ))}
      {aviso && <p className={`text-sm ${aviso.ok ? "text-emerald-700 dark:text-emerald-300" : "text-red-600 dark:text-red-400"}`} role="status" data-testid="revision-aviso">{aviso.texto}</p>}
    </article>
  );
}

export function TarjetaApelacion({ a, puedeRevisar }: { a: ApelacionItem; puedeRevisar: boolean }) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [respuesta, setRespuesta] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const responder = async () => {
    setOcupado(true);
    setError(null);
    try {
      await responderApelacion(a.id, respuesta);
      setRespuesta("");
      toast({ title: "Pedido de revisión respondido", description: `${a.alumno.nombre} recibirá tu respuesta en un aviso.` });
      void qc.invalidateQueries({ queryKey: ["academia", "direccion"] });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };
  return (
    <section className={`rounded-2xl border p-4 space-y-3 ${a.estado === "pendiente" ? "border-orange-500/50" : "border-border"}`} data-testid="tarjeta-apelacion" data-estado={a.estado}>
      <header className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-semibold">
            <Link href={`/academia/direccion/alumno/${a.alumno.userId}`} className="hover:underline">{a.alumno.nombre}</Link>
            {a.alumno.matricula && <span className="text-xs text-muted-foreground tracking-wider"> · {a.alumno.matricula}</span>}
          </p>
          <p className="text-sm text-muted-foreground">{a.examen.titulo} · intento {a.examen.intento} · pidió la revisión {hace(a.fecha)}</p>
        </div>
        <span className={`${CHIP} ${a.estado === "pendiente" ? "bg-orange-500/15 font-medium" : "bg-muted"}`}>{a.estado === "pendiente" ? "Pendiente" : "Respondida"}</span>
      </header>
      <blockquote className="border-l-4 border-orange-500/50 pl-3 text-[15px] whitespace-pre-wrap break-words"><MessageSquareQuote className="w-4 h-4 inline -mt-1 mr-1 text-orange-600" aria-hidden="true" />{a.mensaje}</blockquote>
      {a.escritas.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold">Sus respuestas escritas de ese intento</p>
          {a.escritas.map((it) => <TarjetaRevision key={it.id} item={it} puedeRevisar={puedeRevisar && a.estado === "pendiente"} conAlumno={false} />)}
        </div>
      )}
      {a.estado === "pendiente" ? (
        puedeRevisar && (
          <div className="space-y-2">
            <label className="text-sm block">
              Tu respuesta al alumno: qué se revisó y qué se decidió
              <Textarea value={respuesta} onChange={(e) => setRespuesta(e.target.value)} rows={3} maxLength={1000} className="mt-1 text-[16px]" data-testid="apelacion-respuesta" />
            </label>
            <Button size="sm" className="fire-btn-primary" onClick={responder} disabled={ocupado || respuesta.trim().length < 8} data-testid="apelacion-responder">
              <Send className="w-4 h-4 mr-1.5" /> {ocupado ? "Enviando…" : "Responder y cerrar el pedido"}
            </Button>
            {error && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
          </div>
        )
      ) : (
        <p className="text-sm"><span className="font-semibold">Respuesta{a.por ? ` de ${a.por}` : ""}{a.resuelta ? ` (${fecha(a.resuelta)})` : ""}:</span> {a.respuesta}</p>
      )}
    </section>
  );
}
