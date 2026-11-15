// Las actividades del nivel (server/academia-actividades.ts): las conversaciones de evangelismo y el servicio en un
// ministerio que pide el Nivel 2. El alumno las registra aquí y la Administración las confirma.
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Clock, HandHeart, MessageCircleHeart, Trash2, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { LIMITES_ACTIVIDAD, RESULTADOS_EVANGELISMO, type ActividadVista, type ActividadesNivel, type TipoActividad } from "@shared/academia-actividades";
import { borrarActividad, registrarActividad, useActividades } from "@/components/academia/api";
import { BarraAvance } from "@/components/academia/ui";

const hoyLocal = () => new Date().toLocaleDateString("en-CA");
const dia = (s: string) => new Date(`${s}T12:00:00`).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" });

function Estado({ a }: { a: ActividadVista }) {
  if (a.estado === "confirmada") return <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="w-3.5 h-3.5" /> Confirmada</span>;
  if (a.estado === "rechazada") return <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs bg-red-500/15 text-red-700 dark:text-red-300"><Undo2 className="w-3.5 h-3.5" /> Devuelta</span>;
  return <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs bg-amber-500/15 text-amber-700 dark:text-amber-300"><Clock className="w-3.5 h-3.5" /> Por confirmar</span>;
}

function Registrada({ a, alBorrar }: { a: ActividadVista; alBorrar: (id: number) => void }) {
  return (
    <li className="rounded-xl border border-border p-3.5 space-y-1.5" data-testid="actividad" data-estado={a.estado}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold">
          {a.tipo === "servicio" ? `${a.lugar} · desde el ${dia(a.fecha)}${a.hasta ? ` hasta el ${dia(a.hasta)}` : ""}` : `${a.persona} · ${dia(a.fecha)}`}
        </p>
        <Estado a={a} />
      </div>
      {a.tipo === "servicio" ? <p className="text-xs text-muted-foreground">Líder: {a.lider}</p> : a.resultado && <p className="text-xs text-muted-foreground">{a.resultado}</p>}
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

function Formulario({ n, tipo, alGuardar }: { n: number; tipo: TipoActividad; alGuardar: (v: ActividadesNivel) => void }) {
  const { toast } = useToast();
  const [fecha, setFecha] = useState(hoyLocal());
  const [hasta, setHasta] = useState("");
  const [persona, setPersona] = useState("");
  const [resultado, setResultado] = useState("");
  const [lugar, setLugar] = useState("");
  const [lider, setLider] = useState("");
  const [detalle, setDetalle] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const enviar = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setOcupado(true);
    setError(null);
    try {
      const v = await registrarActividad(n, tipo === "servicio" ? { tipo, fecha, hasta, lugar, lider, detalle } : { tipo, fecha, persona, resultado, detalle });
      alGuardar(v);
      toast({ title: tipo === "servicio" ? "Servicio registrado" : "Conversación registrada", description: "La Administración la revisará y te llegará un aviso." });
      setPersona("");
      setResultado("");
      setDetalle("");
      setLugar("");
      setLider("");
      setHasta("");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };
  const hoy = hoyLocal();
  return (
    <form onSubmit={enviar} className="space-y-3 rounded-xl bg-muted/40 p-4" data-testid={`form-${tipo}`}>
      {tipo === "servicio" ? (
        <>
          <label className="block text-sm">
            <span className="font-medium">Ministerio</span>
            <Input value={lugar} onChange={(e) => setLugar(e.target.value)} maxLength={LIMITES_ACTIVIDAD.lugar} placeholder="Ministerio de niños, alabanza, ujieres…" className="mt-1" data-testid="act-lugar" />
          </label>
          <label className="block text-sm">
            <span className="font-medium">Líder del ministerio</span>
            <Input value={lider} onChange={(e) => setLider(e.target.value)} maxLength={LIMITES_ACTIVIDAD.lider} placeholder="Quién te acompaña en ese servicio" className="mt-1" data-testid="act-lider" />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm">
              <span className="font-medium">Desde</span>
              <Input type="date" value={fecha} max={hoy} onChange={(e) => setFecha(e.target.value)} className="mt-1" data-testid="act-fecha" />
            </label>
            <label className="block text-sm">
              <span className="font-medium">Hasta <span className="text-muted-foreground font-normal">(si terminó)</span></span>
              <Input type="date" value={hasta} max={hoy} min={fecha} onChange={(e) => setHasta(e.target.value)} className="mt-1" data-testid="act-hasta" />
            </label>
          </div>
        </>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <label className="block text-sm">
              <span className="font-medium">Con quién</span>
              <Input value={persona} onChange={(e) => setPersona(e.target.value)} maxLength={LIMITES_ACTIVIDAD.persona} placeholder="Un compañero de trabajo, mi vecina M. R.…" className="mt-1" data-testid="act-persona" />
            </label>
            <label className="block text-sm">
              <span className="font-medium">Cuándo</span>
              <Input type="date" value={fecha} max={hoy} onChange={(e) => setFecha(e.target.value)} className="mt-1" data-testid="act-fecha" />
            </label>
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
      <label className="block text-sm">
        <span className="font-medium">{tipo === "servicio" ? "Qué haces en ese ministerio" : "De qué hablaron y cómo fue"}</span>
        <Textarea value={detalle} onChange={(e) => setDetalle(e.target.value)} maxLength={LIMITES_ACTIVIDAD.detalleMax} rows={3} className="mt-1" data-testid="act-detalle" />
        <span className={`block text-xs mt-1 ${detalle.trim().length < LIMITES_ACTIVIDAD.detalleMin ? "text-muted-foreground" : "text-emerald-700 dark:text-emerald-300"}`}>
          {detalle.trim().length} / al menos {LIMITES_ACTIVIDAD.detalleMin} letras
        </span>
      </label>
      {error && <p className="text-sm text-orange-700 dark:text-orange-300" role="alert">{error}</p>}
      <Button type="submit" className="fire-btn-primary" disabled={ocupado} data-testid={`act-registrar-${tipo}`}>
        {tipo === "servicio" ? "Registrar mi servicio" : "Registrar la conversación"}
      </Button>
    </form>
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
  const conversaciones = v.lista.filter((a) => a.tipo === "evangelismo");
  const servicios = v.lista.filter((a) => a.tipo === "servicio");
  return (
    <section className="glass-card p-5 md:p-6 space-y-6" data-testid="nivel-actividades">
      <div>
        <h2 className="font-display text-2xl font-bold">Actividades del nivel</h2>
        <p className="text-muted-foreground mt-1 text-[15px]">
          Lo que aprendes se vive: este nivel pide compartir tu fe y servir en tu iglesia. Registra cada actividad; la Administración la confirma y te llega un
          aviso.
        </p>
        {!v.puedeRegistrar && v.motivo && <p className="mt-3 text-sm text-orange-700 dark:text-orange-300" data-testid="actividades-cerradas">{v.motivo}</p>}
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-lg flex items-center gap-2"><MessageCircleHeart className="w-5 h-5 text-orange-500" /> Conversaciones de evangelismo</h3>
        <p className="text-sm text-muted-foreground">
          {v.pide.evangelismo} conversaciones en las que compartiste el evangelio, como aprendiste en Evangelismo personal: con quién, cuándo y cómo fue.
        </p>
        <div className="max-w-md">
          <BarraAvance valor={Math.min(v.evangelismo.confirmadas, v.pide.evangelismo)} de={v.pide.evangelismo} etiqueta={`${Math.min(v.evangelismo.confirmadas, v.pide.evangelismo)} de ${v.pide.evangelismo} confirmadas${v.evangelismo.pendientes ? ` · ${v.evangelismo.pendientes} por confirmar` : ""}`} />
        </div>
        {conversaciones.length > 0 && <ul className="space-y-2">{conversaciones.map((a) => <Registrada key={a.id} a={a} alBorrar={borrar} />)}</ul>}
        {v.puedeRegistrar && (abierto === "evangelismo" ? (
          <Formulario n={n} tipo="evangelismo" alGuardar={guardar} />
        ) : (
          <Button variant="outline" onClick={() => setAbierto("evangelismo")} data-testid="act-abrir-evangelismo">Registrar una conversación</Button>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-lg flex items-center gap-2"><HandHeart className="w-5 h-5 text-orange-500" /> Servicio en un ministerio</h3>
        <p className="text-sm text-muted-foreground">
          Sirve al menos un mes ({v.pide.servicioDias} días) en un ministerio de tu iglesia. Registra dónde, con qué líder y desde cuándo; cuenta cuando la
          Administración lo confirma y se cumplen los días.
        </p>
        <p className="text-sm font-medium" data-testid="servicio-estado">
          {v.servicio.hecho
            ? "Cumplido: servicio confirmado."
            : v.servicio.confirmado
              ? `Confirmado · ${v.servicio.dias ?? 0} de ${v.pide.servicioDias} días`
              : v.servicio.pendiente
                ? "Registrado · por confirmar"
                : "Todavía sin registrar"}
        </p>
        {servicios.length > 0 && <ul className="space-y-2">{servicios.map((a) => <Registrada key={a.id} a={a} alBorrar={borrar} />)}</ul>}
        {v.puedeRegistrar && !v.servicio.hecho && (abierto === "servicio" ? (
          <Formulario n={n} tipo="servicio" alGuardar={guardar} />
        ) : (
          <Button variant="outline" onClick={() => setAbierto("servicio")} data-testid="act-abrir-servicio">Registrar mi servicio</Button>
        ))}
      </div>
    </section>
  );
}
