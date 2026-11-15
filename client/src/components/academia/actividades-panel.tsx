// «Para revisar» de la Administración: las actividades del nivel (conversaciones de evangelismo y servicios) que los
// alumnos registraron. Se confirman o se devuelven con un motivo; el alumno recibe un aviso. Nadie confirma lo suyo.
import { useState } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, HandHeart, MessageCircleHeart, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { ActividadRevision } from "@shared/academia-actividades";
import { revisarActividad, useActividadesPanel } from "@/components/academia/api";
import { hace } from "@/components/academia/seguimiento";
import { useArea } from "@/components/academia/area";

const dia = (s: string) => new Date(`${s}T12:00:00`).toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" });

function TarjetaActividad({ a, puedeRevisar }: { a: ActividadRevision; puedeRevisar: boolean }) {
  const qc = useQueryClient();
  const { base } = useArea();
  const { toast } = useToast();
  const [devolviendo, setDevolviendo] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const decidir = async (accion: "confirmar" | "rechazar") => {
    setOcupado(true);
    setError(null);
    try {
      const r = await revisarActividad(a.id, accion, accion === "rechazar" ? motivo : "");
      toast({
        title: accion === "confirmar" ? "Actividad confirmada" : "Actividad devuelta",
        description: r.nivelCompleto ? `${a.alumno.nombre} completó el Nivel ${a.nivel}.` : `${a.alumno.nombre} recibe un aviso.`,
      });
      void qc.invalidateQueries({ queryKey: ["academia", "direccion"] });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };
  const Icono = a.tipo === "servicio" ? HandHeart : MessageCircleHeart;
  return (
    <article className="glass-card p-5 space-y-2.5" data-testid="tarjeta-actividad" data-actividad={a.id}>
      <header className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold">
            <Link href={`${base}/alumno/${a.alumno.userId}`} className="hover:underline">{a.alumno.nombre}</Link>
            {a.alumno.matricula && <span className="text-xs text-muted-foreground tracking-wider"> · {a.alumno.matricula}</span>}
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Icono className="w-4 h-4 text-orange-500" />
            {a.tipo === "servicio" ? "Servicio en un ministerio" : "Conversación de evangelismo"} · Nivel {a.nivel} · registrada {hace(a.creada)}
          </p>
        </div>
        {a.estado === "confirmada" && <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="w-3.5 h-3.5" /> Confirmada</span>}
        {a.estado === "rechazada" && <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs bg-red-500/15 text-red-700 dark:text-red-300"><Undo2 className="w-3.5 h-3.5" /> Devuelta</span>}
      </header>
      <dl className="grid gap-x-4 gap-y-1 text-sm sm:grid-cols-2">
        {a.tipo === "servicio" ? (
          <>
            <div><dt className="inline text-muted-foreground">Ministerio: </dt><dd className="inline">{a.lugar}</dd></div>
            <div><dt className="inline text-muted-foreground">Líder: </dt><dd className="inline">{a.lider}</dd></div>
            <div><dt className="inline text-muted-foreground">Desde: </dt><dd className="inline">{dia(a.fecha)}{a.hasta ? ` hasta el ${dia(a.hasta)}` : " (sigue sirviendo)"}</dd></div>
          </>
        ) : (
          <>
            <div><dt className="inline text-muted-foreground">Con: </dt><dd className="inline">{a.persona}</dd></div>
            <div><dt className="inline text-muted-foreground">Fecha: </dt><dd className="inline">{dia(a.fecha)}</dd></div>
            {a.resultado && <div><dt className="inline text-muted-foreground">Cómo terminó: </dt><dd className="inline">{a.resultado}</dd></div>}
          </>
        )}
      </dl>
      <p className="text-[15px] whitespace-pre-line">{a.detalle}</p>
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
        ) : (
          <div className="flex flex-wrap gap-2">
            <Button className="fire-btn-primary" disabled={ocupado} onClick={() => decidir("confirmar")} data-testid="actividad-confirmar">Confirmar</Button>
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
          Las conversaciones de evangelismo y los servicios que pide el Nivel 2. Confírmalos si son verdaderos (puedes preguntarle al líder del ministerio) o
          devuélvelos con un motivo. El servicio cuenta cuando lo confirmas y se cumplen sus 28 días.
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
