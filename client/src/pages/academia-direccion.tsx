// El panel de seguimiento de la Dirección académica (server/academia-direccion.ts): el resumen, los alumnos con su
// avance, las materias, la revisión del contenido (server/academia-calidad.ts), el registro de inscripciones y los roles
// y permisos. Cada rol ve lo que le toca
// (shared/academia-permisos.ts): la Dirección, todo; los profesores, sin los datos de contacto; las iglesias aliadas,
// solo a los alumnos de su iglesia.
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle, ArrowLeft, BookCheck, BookOpen, ClipboardCheck, Clock, Download, FileClock, History, LayoutDashboard, Lock, LockOpen, Search, ShieldCheck, Users,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { loginUrl } from "@/lib/login-redirect";
import { NOMBRE_ACADEMIA, NOMBRE_ESTATUS, type EstatusAlumno } from "@shared/academia";
import { CAPACIDADES, ROLES_ACADEMIA, TEXTO_ALCANCE, rolAcademia } from "@shared/academia-permisos";
import type { ActividadItem, AlumnoFila, DireccionResumen } from "@shared/academia-direccion";
import {
  cambiarApertura, enlaceReporte, useContenido, useDireccionActividad, useDireccionAlumnos, useDireccionResumen, useHistorial, useRevision, type ReporteCsv,
} from "@/components/academia/api";
import type { ContenidoResumen } from "@shared/academia-calidad";
import { TarjetaApelacion, TarjetaRevision } from "@/components/academia/revision";
import { Cargando } from "@/components/academia/ui";
import { Barras, ChipEstatus, Indicador, ListaActividad, TablaMaterias, fecha, hace, numero } from "@/components/academia/seguimiento";

const ORDEN_ESTATUS: EstatusAlumno[] = ["aspirante", "activo", "pausa", "egresado", "graduado", "retirado"];
const SELECT =
  "h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring";
const enlaceAlumno = (id: number) => `/academia/direccion/alumno/${id}`;
const enlaceMateria = (id: string) => `/academia/direccion/materia/${id}`;
const sinTildes = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const REPORTES: { archivo: ReporteCsv; texto: string }[] = [
  { archivo: "alumnos.csv", texto: "Alumnos" },
  { archivo: "avance.csv", texto: "Avance por materia" },
  { archivo: "materias.csv", texto: "Resumen por materia" },
];

/** Los primeros 7 y el resto como «Otros». */
function conOtros(filas: { nombre: string; n: number }[], tope = 7) {
  if (filas.length <= tope + 1) return filas;
  const resto = filas.slice(tope).reduce((a, f) => a + f.n, 0);
  return [...filas.slice(0, tope), { nombre: "Otros", n: resto }];
}

function Apertura({ abierta, irA }: { abierta: boolean; irA: (tab: string) => void }) {
  const qc = useQueryClient();
  const contenido = useContenido(!abierta);
  const c = contenido.data;
  const faltan = c ? c.total - c.aprobadas : 0;
  const [confirmando, setConfirmando] = useState(false);
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cambiar = async () => {
    setOcupado(true);
    setError(null);
    try {
      await cambiarApertura(!abierta);
      setConfirmando(false);
      void qc.invalidateQueries({ queryKey: ["academia"] });
      void qc.invalidateQueries({ queryKey: ["/api/academia/abierta"] });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };
  return (
    <section className={`glass-card p-5 border ${abierta ? "border-emerald-500/40" : "border-orange-500/40"}`} data-testid="direccion-apertura" data-abierta={abierta}>
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        {abierta ? <LockOpen className="w-6 h-6 text-emerald-600 shrink-0" /> : <Lock className="w-6 h-6 text-orange-500 shrink-0" />}
        <div className="flex-1">
          <p className="font-semibold">{abierta ? "La academia está abierta para todos" : "La academia está en vista previa"}</p>
          <p className="text-sm text-muted-foreground">
            {abierta
              ? "Todos los miembros la ven en el menú y en la barra de la app, y los visitantes ven su catálogo."
              : "Solo la administración, los profesores y las iglesias aliadas la ven. Ábrela cuando el Nivel 1 esté revisado."}
          </p>
          {!abierta && c && (
            <p className="text-sm mt-1.5" data-testid="apertura-revision">
              {faltan > 0 ? <AlertTriangle className="w-4 h-4 inline -mt-0.5 mr-1 text-orange-500" aria-hidden="true" /> : <ShieldCheck className="w-4 h-4 inline -mt-0.5 mr-1 text-emerald-600" aria-hidden="true" />}
              Revisión doctrinal: {c.aprobadas} de {c.total} materias aprobadas
              {c.abiertas > 0 && ` · ${c.abiertas} ${c.abiertas === 1 ? "observación abierta" : "observaciones abiertas"}`}.{" "}
              <button type="button" className="underline" onClick={() => irA("contenido")}>Ver la revisión</button>
            </p>
          )}
        </div>
        {!confirmando && (
          <Button variant={abierta ? "outline" : "default"} className={abierta ? "" : "fire-btn-primary"} onClick={() => setConfirmando(true)} data-testid="apertura-cambiar">
            {abierta ? "Volver a la vista previa" : "Abrir la academia para todos"}
          </Button>
        )}
      </div>
      {confirmando && (
        <div className="mt-4 rounded-xl border border-border p-4 space-y-3">
          <p className="text-sm">
            {abierta
              ? "La academia dejará de verse para los miembros y los visitantes. Los alumnos inscritos no pierden nada de su avance."
              : "Al abrirla, la verán todos los miembros (el botón «Academia» en la barra y en el menú), los visitantes verán el catálogo y la primera lección de cada materia, y cualquiera con cuenta podrá inscribirse."}
          </p>
          {!abierta && faltan > 0 && (
            <p className="text-sm font-medium" data-testid="apertura-faltan">
              <AlertTriangle className="w-4 h-4 inline -mt-0.5 mr-1 text-orange-500" aria-hidden="true" />
              Faltan {faltan === 1 ? "1 materia" : `${faltan} materias`} por aprobar en la revisión doctrinal. Puedes abrirla igual, pero lo recomendado es aprobarlas antes.
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            <Button className="fire-btn-primary" onClick={cambiar} disabled={ocupado} data-testid="apertura-confirmar">
              {ocupado ? "Guardando…" : abierta ? "Sí, volver a la vista previa" : "Sí, abrirla para todos"}
            </Button>
            <Button variant="ghost" onClick={() => setConfirmando(false)} disabled={ocupado}>Cancelar</Button>
          </div>
        </div>
      )}
      {error && <p className="text-sm text-red-600 dark:text-red-400 mt-3" role="alert">{error}</p>}
    </section>
  );
}

function Resumen({ d, irA }: { d: DireccionResumen; irA: (tab: string) => void }) {
  const t = d.totales;
  const porRevisar = d.pendientes.escritas + d.pendientes.apelaciones;
  return (
    <div className="space-y-6">
      {d.puede.abrir && <Apertura abierta={d.abierta} irA={irA} />}
      {d.puede.revisar && porRevisar > 0 && (
        <button type="button" onClick={() => irA("revisar")} className="glass-card w-full p-4 flex items-center gap-3 text-left border border-orange-500/40 hover:-translate-y-0.5 transition" data-testid="direccion-por-revisar">
          <ClipboardCheck className="w-5 h-5 text-orange-500 shrink-0" />
          <span className="flex-1 text-sm">
            <strong>Para revisar:</strong> {d.pendientes.escritas} {d.pendientes.escritas === 1 ? "respuesta escrita" : "respuestas escritas"} y {d.pendientes.apelaciones}{" "}
            {d.pendientes.apelaciones === 1 ? "pedido de revisión" : "pedidos de revisión"}.
          </span>
          <span className="text-sm font-medium">Revisar</span>
        </button>
      )}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-5" data-testid="direccion-indicadores">
        <Indicador etiqueta="Inscritos" valor={t.inscritos} nota={`${numero(t.nuevosMes)} en los últimos 30 días`} testId="indicador-inscritos" />
        <Indicador etiqueta="Nuevos esta semana" valor={t.nuevosSemana} />
        <Indicador etiqueta="Estudiantes activos" valor={d.estatus.activo} nota={`${numero(d.estatus.pausa)} en pausa · ${numero(d.estatus.aspirante)} sin empezar`} />
        <Indicador etiqueta="Materias aprobadas" valor={t.aprobadas} nota={`${numero(t.lecciones)} lecciones completadas`} />
        <Indicador etiqueta="Promedio general" valor={t.promedio ?? "—"} nota={t.niveles ? `${numero(t.niveles)} ${t.niveles === 1 ? "nivel completo" : "niveles completos"}` : "de las materias aprobadas"} />
      </div>

      <section className="glass-card p-5">
        <div className="flex items-center justify-between gap-3 mb-3">
          <h3 className="font-semibold">Materias: quiénes están inscritos y cuánto avanzan</h3>
          <Button variant="ghost" size="sm" onClick={() => irA("materias")}>Ver todas</Button>
        </div>
        <TablaMaterias materias={d.materias} enlace={enlaceMateria} />
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        <Barras titulo="Alumnos por estatus" filas={ORDEN_ESTATUS.map((k) => ({ nombre: NOMBRE_ESTATUS[k], n: d.estatus[k] }))} testId="barras-estatus" />
        <Barras titulo="Alumnos por país" filas={conOtros(d.paises)} vacio="Todavía no hay alumnos." />
        <Barras titulo="Alumnos por iglesia" filas={conOtros(d.iglesias)} vacio="Todavía no hay alumnos." />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="glass-card p-5" data-testid="direccion-detenidos">
          <h3 className="font-semibold">Se detuvieron</h3>
          <p className="text-xs text-muted-foreground mb-3">Con materias en curso y 14 días o más sin estudiar. Un mensaje a tiempo ayuda a no abandonar.</p>
          {d.detenidos.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nadie, por ahora.</p>
          ) : (
            <ul className="space-y-2.5 text-sm">
              {d.detenidos.map((a) => (
                <li key={a.userId} className="flex items-start justify-between gap-3">
                  <span className="min-w-0">
                    <Link href={enlaceAlumno(a.userId)} className="font-medium hover:underline">{a.nombre}</Link>
                    <span className="block text-xs text-muted-foreground truncate">{a.enCurso.join(" · ")}</span>
                  </span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{hace(a.ultima)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="glass-card p-5">
          <div className="flex items-center justify-between gap-3 mb-3">
            <h3 className="font-semibold">Actividad reciente</h3>
            <Button variant="ghost" size="sm" onClick={() => irA("registro")}>Ver el registro</Button>
          </div>
          <ListaActividad items={d.actividad.slice(0, 10)} enlaceAlumno={enlaceAlumno} />
        </section>
      </div>
    </div>
  );
}

function Alumnos({ resumen }: { resumen: DireccionResumen }) {
  const q = useDireccionAlumnos();
  const [texto, setTexto] = useState("");
  const [estatus, setEstatus] = useState("");
  const [materia, setMateria] = useState("");
  const [iglesia, setIglesia] = useState("");
  const [pais, setPais] = useState("");
  const lista = q.data?.alumnos ?? [];
  const contacto = !!q.data?.puede.contacto;
  const filtrados = useMemo(() => {
    const t = sinTildes(texto.trim());
    return lista.filter(
      (a) =>
        (!t || sinTildes([a.nombre, a.matricula, a.correo ?? "", a.telefono ?? "", a.iglesia, a.ciudad].join(" ")).includes(t)) &&
        (!estatus || a.estatus.clave === estatus) &&
        (!materia || a.enCurso.includes(materia)) &&
        (!iglesia || (a.iglesia || "Sin iglesia") === iglesia) &&
        (!pais || a.pais === pais),
    );
  }, [lista, texto, estatus, materia, iglesia, pais]);
  if (q.isLoading) return <p className="text-muted-foreground">Cargando a los alumnos…</p>;
  if (q.error) return <p className="text-sm text-red-600">{q.error.message}</p>;
  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" aria-hidden="true" />
          <Input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder={contacto ? "Buscar por nombre, matrícula, correo o teléfono" : "Buscar por nombre o matrícula"} className="pl-9 h-10" aria-label="Buscar alumnos" data-testid="alumnos-buscar" />
        </div>
        <select className={SELECT} value={estatus} onChange={(e) => setEstatus(e.target.value)} aria-label="Filtrar por estatus" data-testid="alumnos-estatus">
          <option value="">Todos los estatus</option>
          {ORDEN_ESTATUS.map((k) => <option key={k} value={k}>{NOMBRE_ESTATUS[k]}</option>)}
        </select>
        <select className={SELECT} value={materia} onChange={(e) => setMateria(e.target.value)} aria-label="Filtrar por materia en curso">
          <option value="">Cursando cualquier materia</option>
          {resumen.materias.map((m) => <option key={m.id} value={m.titulo}>{m.titulo}</option>)}
        </select>
        {resumen.iglesias.length > 1 && (
          <select className={SELECT} value={iglesia} onChange={(e) => setIglesia(e.target.value)} aria-label="Filtrar por iglesia">
            <option value="">Todas las iglesias</option>
            {resumen.iglesias.map((x) => <option key={x.nombre} value={x.nombre}>{x.nombre}</option>)}
          </select>
        )}
        {resumen.paises.length > 1 && (
          <select className={SELECT} value={pais} onChange={(e) => setPais(e.target.value)} aria-label="Filtrar por país">
            <option value="">Todos los países</option>
            {resumen.paises.map((x) => <option key={x.nombre} value={x.nombre}>{x.nombre}</option>)}
          </select>
        )}
      </div>
      <p className="text-sm text-muted-foreground" data-testid="alumnos-cuantos">
        {filtrados.length === lista.length ? `${numero(lista.length)} ${lista.length === 1 ? "alumno" : "alumnos"}` : `${numero(filtrados.length)} de ${numero(lista.length)} alumnos`}
      </p>
      <div className="glass-card p-0 overflow-x-auto">
        <table className="w-full text-sm" data-testid="tabla-alumnos">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-border">
              <th className="py-2.5 px-4 font-medium">Alumno</th>
              <th className="py-2.5 px-3 font-medium">Iglesia</th>
              <th className="py-2.5 px-3 font-medium">País</th>
              <th className="py-2.5 px-3 font-medium">Estatus</th>
              <th className="py-2.5 px-3 font-medium text-right">Aprobadas</th>
              <th className="py-2.5 px-3 font-medium">En curso</th>
              <th className="py-2.5 px-3 font-medium text-right">Lecciones</th>
              <th className="py-2.5 px-3 font-medium">Última actividad</th>
              {contacto && <th className="py-2.5 px-4 font-medium">Contacto</th>}
            </tr>
          </thead>
          <tbody>
            {filtrados.map((a: AlumnoFila) => (
              <tr key={a.userId} className="border-b border-border/60 last:border-0 align-top">
                <td className="py-2.5 px-4">
                  <Link href={enlaceAlumno(a.userId)} className="font-medium hover:underline">{a.nombre}</Link>
                  <span className="block text-xs text-muted-foreground tracking-wider">{a.matricula}</span>
                </td>
                <td className="py-2.5 px-3">{a.iglesia || <span className="text-muted-foreground">—</span>}</td>
                <td className="py-2.5 px-3 whitespace-nowrap">{a.pais}</td>
                <td className="py-2.5 px-3"><ChipEstatus e={a.estatus} /></td>
                <td className="py-2.5 px-3 text-right tabular-nums">{a.aprobadas} de {a.materias}</td>
                <td className="py-2.5 px-3 max-w-[16rem]">{a.enCurso.length ? a.enCurso.join(" · ") : <span className="text-muted-foreground">—</span>}</td>
                <td className="py-2.5 px-3 text-right tabular-nums">{a.lecciones}</td>
                <td className="py-2.5 px-3 whitespace-nowrap" title={fecha(a.ultima)}>{hace(a.ultima)}</td>
                {contacto && (
                  <td className="py-2.5 px-4 text-xs">
                    {a.telefono && <span className="block whitespace-nowrap">{a.telefono}</span>}
                    {a.correo && <span className="block">{a.correo}</span>}
                  </td>
                )}
              </tr>
            ))}
            {!filtrados.length && (
              <tr>
                <td colSpan={contacto ? 9 : 8} className="py-8 text-center text-muted-foreground">{lista.length ? "Nadie coincide con la búsqueda." : "Todavía no hay alumnos inscritos."}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Revisar() {
  const { user } = useAuth();
  const q = useRevision();
  /** Nadie revisa lo suyo: sus tarjetas se ven sin botones. */
  const ajeno = (userId: number) => !user || user.id !== userId;
  if (q.isLoading) return <p className="text-muted-foreground">Cargando lo que hay para revisar…</p>;
  if (!q.data) return <p className="text-sm text-red-600">{q.error?.message ?? "No se pudo cargar."}</p>;
  const { pendientes, apelaciones, recientes } = q.data;
  const abiertas = apelaciones.filter((a) => a.estado === "pendiente");
  const cerradas = apelaciones.filter((a) => a.estado !== "pendiente");
  return (
    <div className="space-y-10" data-testid="direccion-revisar">
      <section className="space-y-3">
        <h3 className="font-display text-xl font-bold">Pedidos de revisión ({abiertas.length})</h3>
        <p className="text-sm text-muted-foreground">
          Cada alumno puede pedir que se revise un examen una vez, dentro de los 7 días. Revisa sus respuestas, cambia la nota si corresponde y respóndele: le
          llega un aviso.
        </p>
        {abiertas.length ? abiertas.map((a) => <TarjetaApelacion key={a.id} a={a} puedeRevisar={ajeno(a.alumno.userId)} />) : <p className="text-sm text-muted-foreground">No hay pedidos pendientes.</p>}
      </section>
      <section className="space-y-3">
        <h3 className="font-display text-xl font-bold">Respuestas escritas para revisar ({pendientes.length})</h3>
        <p className="text-sm text-muted-foreground">
          El corrector las marcó por una nota dudosa, texto pegado, una copia de la pregunta, una lista de palabras o por llegar fuera de tiempo. Su nota
          automática vale mientras nadie la cambie. Si cambias una nota, se recalculan el examen y la materia, y el alumno recibe un aviso con el motivo.
        </p>
        {pendientes.length ? pendientes.map((it) => <TarjetaRevision key={it.id} item={it} puedeRevisar={ajeno(it.alumno.userId)} />) : <p className="text-sm text-muted-foreground">Nada pendiente.</p>}
      </section>
      {cerradas.length > 0 && (
        <section className="space-y-3">
          <h3 className="font-display text-xl font-bold">Pedidos respondidos en los últimos 30 días</h3>
          {cerradas.map((a) => <TarjetaApelacion key={a.id} a={a} puedeRevisar={false} />)}
        </section>
      )}
      {recientes.length > 0 && (
        <section className="space-y-3">
          <h3 className="font-display text-xl font-bold">Revisadas hace poco</h3>
          {recientes.map((it) => <TarjetaRevision key={it.id} item={it} puedeRevisar={ajeno(it.alumno.userId)} />)}
        </section>
      )}
    </div>
  );
}

function Historial() {
  const q = useHistorial();
  if (q.isLoading) return <p className="text-muted-foreground">Cargando el historial…</p>;
  if (!q.data) return <p className="text-sm text-red-600">{q.error?.message ?? "No se pudo cargar."}</p>;
  const items = q.data.historial;
  return (
    <section className="glass-card p-5" data-testid="direccion-historial">
      <p className="text-sm text-muted-foreground mb-4">Cada cambio de nota, cada pedido de revisión respondido, cada documento revocado o restaurado, cada nombre corregido, cada observación y aprobación del contenido, cada pregunta retirada del banco y cada apertura de la academia, con quién lo hizo y por qué.</p>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Todavía no hay cambios.</p>
      ) : (
        <ol className="space-y-4">
          {items.map((h) => (
            <li key={h.id} className="text-sm border-b border-border/60 pb-3 last:border-0">
              <p>
                <span className="font-semibold">{h.por}</span> {h.texto.charAt(0).toLowerCase() + h.texto.slice(1)}
                {h.alumno && <> · <Link href={enlaceAlumno(h.alumno.userId)} className="underline">{h.alumno.nombre}</Link></>}
              </p>
              {h.motivo && <p className="text-muted-foreground mt-0.5">Motivo: «{h.motivo}»</p>}
              <p className="text-xs text-muted-foreground mt-0.5">{new Date(h.fecha).toLocaleString("es")}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

const FILTRO_REGISTRO: { id: "" | ActividadItem["tipo"]; texto: string }[] = [
  { id: "", texto: "Todo" },
  { id: "inscripcion", texto: "Inscripciones en la academia" },
  { id: "materia", texto: "Inscripciones en materias" },
  { id: "aprobada", texto: "Materias aprobadas" },
  { id: "nivel", texto: "Niveles completos" },
];

const CHIP = "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs whitespace-nowrap";

function EstadoRevision({ m }: { m: ContenidoResumen }) {
  if (m.aprobacion?.vigente) return <span className={`${CHIP} bg-emerald-500/15 font-medium`}><ShieldCheck className="w-3 h-3" aria-hidden="true" /> Aprobada</span>;
  if (m.aprobacion) return <span className={`${CHIP} bg-orange-500/15 font-medium`}><AlertTriangle className="w-3 h-3" aria-hidden="true" /> Cambió después de aprobarla</span>;
  return <span className={`${CHIP} bg-muted`}><Clock className="w-3 h-3" aria-hidden="true" /> Por revisar</span>;
}

function Contenido() {
  const q = useContenido();
  if (q.isLoading) return <p className="text-muted-foreground">Cargando la revisión del contenido…</p>;
  if (!q.data) return <p className="text-sm text-red-600">{q.error?.message ?? "No se pudo cargar."}</p>;
  const { materias, total, aprobadas, abiertas } = q.data;
  const mirar = materias.reduce((s, m) => s + m.alertas, 0);
  return (
    <div className="space-y-4" data-testid="direccion-contenido">
      <p className="text-sm text-muted-foreground">
        La revisión doctrinal: lee cada materia completa (sus lecciones, el banco del examen y el repaso), deja observaciones y apruébala antes de abrir la academia. Cuando haya alumnos, el análisis de preguntas marca las que conviene revisar.
      </p>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
        <Indicador etiqueta="Materias aprobadas" valor={`${aprobadas} de ${total}`} nota="en la revisión doctrinal" testId="contenido-aprobadas" />
        <Indicador etiqueta="Observaciones abiertas" valor={abiertas} />
        <Indicador etiqueta="Preguntas para mirar" valor={mirar} nota="según el análisis de preguntas" />
      </div>
      <div className="glass-card p-0 overflow-x-auto">
        <table className="w-full text-sm" data-testid="tabla-contenido">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-border">
              <th className="py-2.5 px-4 font-medium">Materia</th>
              <th className="py-2.5 px-3 font-medium">Revisión doctrinal</th>
              <th className="py-2.5 px-3 font-medium text-right">Observaciones abiertas</th>
              <th className="py-2.5 px-3 font-medium text-right">Para mirar</th>
              <th className="py-2.5 px-3 font-medium text-right">Retiradas</th>
              <th className="py-2.5 px-4 font-medium">Banco</th>
            </tr>
          </thead>
          <tbody>
            {materias.map((m) => (
              <tr key={m.id} className="border-b border-border/60 last:border-0 align-top" data-testid="fila-contenido" data-materia={m.id}>
                <td className="py-2.5 px-4">
                  <Link href={`/academia/direccion/contenido/${m.id}`} className="font-medium hover:underline">{m.titulo}</Link>
                  <span className="block text-xs text-muted-foreground">{m.nivel ? `Nivel ${m.nivel}` : "Especialidad"} · {m.lecciones} lecciones</span>
                </td>
                <td className="py-2.5 px-3">
                  <EstadoRevision m={m} />
                  {m.aprobacion && <span className="block text-xs text-muted-foreground mt-1">{m.aprobacion.por} · {fecha(m.aprobacion.fecha)}</span>}
                </td>
                <td className="py-2.5 px-3 text-right tabular-nums">{m.abiertas || "—"}</td>
                <td className="py-2.5 px-3 text-right tabular-nums">{m.alertas || "—"}</td>
                <td className="py-2.5 px-3 text-right tabular-nums">{m.retiradas || "—"}</td>
                <td className="py-2.5 px-4 whitespace-nowrap text-muted-foreground">{m.preguntas} preguntas · {m.escritas} escritas</td>
              </tr>
            ))}
            {!materias.length && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-muted-foreground">Todavía no hay materias con contenido.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Registro() {
  const q = useDireccionActividad();
  const [tipo, setTipo] = useState<"" | ActividadItem["tipo"]>("");
  if (q.isLoading) return <p className="text-muted-foreground">Cargando el registro…</p>;
  if (q.error) return <p className="text-sm text-red-600">{q.error.message}</p>;
  const items = (q.data?.actividad ?? []).filter((a) => !tipo || a.tipo === tipo);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar el registro">
        {FILTRO_REGISTRO.map((f) => (
          <button
            key={f.id || "todo"}
            type="button"
            onClick={() => setTipo(f.id)}
            aria-pressed={tipo === f.id}
            className={`rounded-full px-3.5 py-1.5 text-sm border transition-colors ${tipo === f.id ? "bg-orange-600 border-orange-600 text-white" : "border-border hover:border-orange-500"}`}
          >
            {f.texto}
          </button>
        ))}
      </div>
      <section className="glass-card p-5" data-testid="direccion-registro">
        <ListaActividad items={items} enlaceAlumno={enlaceAlumno} vacio="Nada en el registro con este filtro." />
      </section>
      <p className="text-xs text-muted-foreground">Cada inscripción en la academia y en cada materia llega también como aviso a la campana de la Dirección académica y de quienes dirigen la iglesia del alumno.</p>
    </div>
  );
}

function Permisos({ role }: { role: string | null | undefined }) {
  const mio = rolAcademia(role);
  return (
    <div className="space-y-5" data-testid="direccion-permisos">
      <section className="glass-card p-5">
        <h3 className="font-semibold flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-orange-600" /> Quién es quién en la academia</h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 text-sm">
          {ROLES_ACADEMIA.map((r) => (
            <li key={r.id} className={`rounded-xl border p-3 ${r.id === mio ? "border-orange-500" : "border-border"}`}>
              <p className="font-semibold">{r.nombre}{r.id === mio ? " · tu rol" : ""}</p>
              <p className="text-muted-foreground mt-0.5">{r.quienes}</p>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground mt-3">El rol de cada cuenta se asigna en Administración → Usuarios. El servidor comprueba estos permisos en cada consulta.</p>
      </section>
      <section className="glass-card p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-border">
              <th className="py-2.5 px-4 font-medium">Qué se puede hacer</th>
              {ROLES_ACADEMIA.map((r) => (
                <th key={r.id} className={`py-2.5 px-3 font-medium ${r.id === mio ? "text-foreground" : ""}`}>{r.nombre}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CAPACIDADES.map((c) => (
              <tr key={c.id} className="border-b border-border/60 last:border-0 align-top">
                <td className="py-2.5 px-4">
                  <span className="font-medium">{c.texto}</span>
                  {c.pronto && <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-[11px]">Próximamente</span>}
                  <span className="block text-xs text-muted-foreground">{c.detalle}</span>
                </td>
                {ROLES_ACADEMIA.map((r) => (
                  <td key={r.id} className={`py-2.5 px-3 whitespace-nowrap ${r.id === mio ? "font-semibold" : ""} ${c.alcance[r.id] === "no" ? "text-muted-foreground" : ""}`}>
                    {c.alcance[r.id] === "todos" && c.textoTodos ? c.textoTodos : TEXTO_ALCANCE[c.alcance[r.id]]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default function AcademiaDireccion() {
  const { user } = useAuth();
  const q = useDireccionResumen();
  const [tab, setTab] = useState(() => {
    const t = new URLSearchParams(window.location.search).get("tab");
    return t && ["resumen", "revisar", "alumnos", "materias", "contenido", "registro", "historial", "permisos"].includes(t) ? t : "resumen";
  });
  if (q.isLoading) return <Cargando />;
  if (!q.data) {
    const sinSesion = q.error?.status === 401;
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <Lock className="w-12 h-12 mx-auto text-orange-500" />
          <p className="text-lg mt-4 mb-6">{q.error?.message ?? "No se pudo cargar el panel."}</p>
          {sinSesion ? (
            <a href={loginUrl("/academia/direccion")}><Button className="fire-btn-primary h-12 px-7">Entrar</Button></a>
          ) : (
            <Link href="/academia"><Button variant="outline" className="h-12 px-7">Volver a la academia</Button></Link>
          )}
        </div>
      </Layout>
    );
  }
  const d = q.data;
  const rol = ROLES_ACADEMIA.find((r) => r.id === d.rol);
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-16">
        <Link href="/academia" className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Academia</Link>
        <div className="mt-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <p className="data-label text-orange-600 dark:text-orange-300">{NOMBRE_ACADEMIA} · Dirección académica</p>
            <h1 className="heading-display font-display text-3xl md:text-5xl mt-1" data-testid="direccion-titulo">Panel de seguimiento</h1>
            <p className="text-sm text-muted-foreground mt-2" data-testid="direccion-alcance">
              {rol?.nombre}: {d.alcance === "iglesia" ? `ves a los alumnos de ${d.iglesia?.nombre ?? "tu iglesia"}.` : "ves a todos los alumnos de la academia."}
              {!d.puede.contacto && " Los datos de contacto los ven la Dirección académica y las iglesias."}
            </p>
          </div>
          {d.puede.exportar && (
            <div className="flex flex-wrap gap-2" data-testid="direccion-reportes">
              {REPORTES.map((r) => (
                <a key={r.archivo} href={enlaceReporte(r.archivo)} download>
                  <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1.5" /> {r.texto}</Button>
                </a>
              ))}
            </div>
          )}
        </div>

        <Tabs value={tab} onValueChange={setTab} className="mt-6">
          <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-1 rounded-lg mb-6">
            <TabsTrigger value="resumen" className="flex-1 min-w-[110px] gap-1.5"><LayoutDashboard className="w-4 h-4" /> Resumen</TabsTrigger>
            {d.puede.revisar && (
              <TabsTrigger value="revisar" className="flex-1 min-w-[110px] gap-1.5" data-testid="direccion-tab-revisar">
                <ClipboardCheck className="w-4 h-4" /> Para revisar
                {d.pendientes.escritas + d.pendientes.apelaciones > 0 && (
                  <span className="ml-1 rounded-full bg-orange-600 text-white text-[11px] px-1.5 leading-5">{d.pendientes.escritas + d.pendientes.apelaciones}</span>
                )}
              </TabsTrigger>
            )}
            <TabsTrigger value="alumnos" className="flex-1 min-w-[110px] gap-1.5" data-testid="direccion-tab-alumnos"><Users className="w-4 h-4" /> Alumnos</TabsTrigger>
            <TabsTrigger value="materias" className="flex-1 min-w-[110px] gap-1.5"><BookOpen className="w-4 h-4" /> Materias</TabsTrigger>
            {d.puede.contenido && <TabsTrigger value="contenido" className="flex-1 min-w-[110px] gap-1.5" data-testid="direccion-tab-contenido"><BookCheck className="w-4 h-4" /> Contenido</TabsTrigger>}
            <TabsTrigger value="registro" className="flex-1 min-w-[110px] gap-1.5" data-testid="direccion-tab-registro"><History className="w-4 h-4" /> Registro</TabsTrigger>
            {d.puede.revisar && <TabsTrigger value="historial" className="flex-1 min-w-[110px] gap-1.5" data-testid="direccion-tab-historial"><FileClock className="w-4 h-4" /> Historial</TabsTrigger>}
            <TabsTrigger value="permisos" className="flex-1 min-w-[110px] gap-1.5" data-testid="direccion-tab-permisos"><ShieldCheck className="w-4 h-4" /> Roles y permisos</TabsTrigger>
          </TabsList>
          <TabsContent value="resumen"><Resumen d={d} irA={setTab} /></TabsContent>
          <TabsContent value="revisar">{tab === "revisar" && d.puede.revisar && <Revisar />}</TabsContent>
          <TabsContent value="alumnos">{tab === "alumnos" && <Alumnos resumen={d} />}</TabsContent>
          <TabsContent value="materias">
            <section className="glass-card p-5">
              <p className="text-sm text-muted-foreground mb-3">Toca una materia para ver quiénes están inscritos y por dónde va cada uno.</p>
              <TablaMaterias materias={d.materias} enlace={enlaceMateria} />
            </section>
          </TabsContent>
          <TabsContent value="contenido">{tab === "contenido" && d.puede.contenido && <Contenido />}</TabsContent>
          <TabsContent value="registro">{tab === "registro" && <Registro />}</TabsContent>
          <TabsContent value="historial">{tab === "historial" && d.puede.revisar && <Historial />}</TabsContent>
          <TabsContent value="permisos"><Permisos role={user?.role} /></TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
