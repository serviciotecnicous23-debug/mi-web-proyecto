// El panel de la academia (server/academia-direccion.ts; docs/academia-panel.md). Siete secciones, pensadas primero para
// el teléfono: Inicio (lo que te toca, las cifras, quiénes necesitan ayuda y las tendencias), Pendientes (aprobar y
// revisar), Alumnos, Materias (su seguimiento y su revisión doctrinal, con «Aprobar» en cada una), Laboratorio (el informe
// del laboratorio ministerial, solo la Administración) e Historial. Cada rol
// ve lo que le toca (shared/academia-permisos.ts): solo el administrador administra; el equipo del ministerio y las
// iglesias aliadas solo consultan (las iglesias, a los alumnos de su iglesia).
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle, AlertTriangle, ArrowLeft, BookCheck, BookOpen, ChevronRight, Download, FlaskConical, History, Inbox, LayoutDashboard, Lock, LockOpen, Search, ShieldCheck, SlidersHorizontal, Users,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { useTituloAcademia } from "@/components/academia/titulo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { loginUrl } from "@/lib/login-redirect";
import { NOMBRE_ACADEMIA, NOMBRE_ESTATUS, type EstatusAlumno } from "@shared/academia-base";
import { CAPACIDADES, ROLES_ACADEMIA, rolAcademia, textoCelda } from "@shared/academia-permisos";
import { useArea } from "@/components/academia/area";
import type { ActividadItem, AlumnoFila, DireccionResumen } from "@shared/academia-direccion";
import {
  useAcompanar,
  cambiarApertura, enlaceReporte, useContenido, useDireccionActividad, useDireccionAlumnos, useDireccionResumen, useHistorial, useRevision, type ReporteCsv,
} from "@/components/academia/api";
import { TarjetaApelacion, TarjetaRevision } from "@/components/academia/revision";
import { ActividadesPorConfirmar } from "@/components/academia/actividades-panel";
import { Cargando } from "@/components/academia/ui";
import { ChipEstatus, ListaActividad, Medidor, fecha, hace, numero } from "@/components/academia/seguimiento";
import { ActividadYDatos, Cifras, LoQueTeToca, NecesitanAyuda, Tendencias, type IrA } from "@/components/academia/panel-inicio";
import { PanelMaterias, TarjetaDeclaracionSimple, type VerMaterias } from "@/components/academia/panel-materias";
import { CSV_LABORATORIO, InformeLaboratorio } from "@/components/academia/laboratorio-informe";

const ORDEN_ESTATUS: EstatusAlumno[] = ["aspirante", "activo", "pausa", "egresado", "graduado", "retirado"];
const SELECT =
  "h-11 w-full rounded-md border border-input bg-background px-3 text-[16px] sm:text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring";
/** Los enlaces dentro del panel (en el área de quien mira: administración, maestro o «Mi iglesia»). */
function useEnlaces() {
  const { base } = useArea();
  return { alumno: (id: number) => `${base}/alumno/${id}`, materia: (id: string) => `${base}/materia/${id}`, contenido: (id: string) => `${base}/contenido/${id}` };
}
const sinTildes = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const REPORTES: { archivo: ReporteCsv; texto: string }[] = [
  { archivo: "alumnos.csv", texto: "Los alumnos" },
  { archivo: "avance.csv", texto: "El avance en cada materia" },
  { archivo: "materias.csv", texto: "El resumen por materia" },
];

/** Descargar los informes en CSV (se abren con Excel o con Google Sheets). */
function MenuDescargas({ laboratorio = false }: { laboratorio?: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-11 gap-2" data-testid="direccion-reportes"><Download className="w-4 h-4" aria-hidden="true" /> <span className="hidden sm:inline">Descargar</span></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Descargar en Excel (CSV)</DropdownMenuLabel>
        {REPORTES.map((r) => (
          <DropdownMenuItem key={r.archivo} asChild>
            <a href={enlaceReporte(r.archivo)} download className="cursor-pointer">{r.texto}</a>
          </DropdownMenuItem>
        ))}
        {laboratorio && (
          <DropdownMenuItem asChild>
            <a href={CSV_LABORATORIO} download className="cursor-pointer">Los intentos del laboratorio</a>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Apertura({ abierta, irA }: { abierta: boolean; irA: IrA }) {
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
    <section className={`glass-card p-4 sm:p-5 border ${abierta ? "border-emerald-500/40" : "border-orange-500/40"}`} data-testid="direccion-apertura" data-abierta={abierta}>
      <div className="flex items-start gap-3">
        {abierta ? <LockOpen className="w-6 h-6 text-emerald-600 shrink-0" aria-hidden="true" /> : <Lock className="w-6 h-6 text-orange-500 shrink-0" aria-hidden="true" />}
        <div className="flex-1 min-w-0">
          <p className="font-semibold">{abierta ? "La academia está abierta para todos" : "La academia está en vista previa"}</p>
          <p className="text-sm text-muted-foreground">
            {abierta
              ? "Todos los miembros la ven en el menú y en la barra de la app, y los visitantes ven su catálogo."
              : "Por ahora la ven solo la Administración y, para consultar, los maestros y las iglesias aliadas."}
          </p>
          {!abierta && c && (
            <p className="text-sm mt-1.5" data-testid="apertura-revision">
              Revisión doctrinal: {c.aprobadas} de {c.total} materias aprobadas.{" "}
              <button type="button" className="underline" onClick={() => irA("materias", { materias: "aprobar" })}>Ver las materias por aprobar</button>
            </p>
          )}
        </div>
      </div>
      {!confirmando && (
        <Button variant={abierta ? "outline" : "default"} className={`mt-3 h-11 w-full sm:w-auto ${abierta ? "" : "fire-btn-primary"}`} onClick={() => setConfirmando(true)} data-testid="apertura-cambiar">
          {abierta ? "Volver a la vista previa" : "Abrir la academia para todos"}
        </Button>
      )}
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
          <div className="flex flex-col-reverse sm:flex-row gap-2">
            <Button variant="ghost" className="h-11" onClick={() => setConfirmando(false)} disabled={ocupado}>Cancelar</Button>
            <Button className="fire-btn-primary h-11" onClick={cambiar} disabled={ocupado} data-testid="apertura-confirmar">
              {ocupado ? "Guardando…" : abierta ? "Sí, volver a la vista previa" : "Sí, abrirla para todos"}
            </Button>
          </div>
        </div>
      )}
      {error && <p className="text-sm text-red-600 dark:text-red-400 mt-3" role="alert">{error}</p>}
    </section>
  );
}

/** El orden de la lista de alumnos. */
type OrdenAlumnos = "recientes" | "actividad" | "nombre" | "aprobadas" | "lecciones";
const ORDENES: { id: OrdenAlumnos; texto: string }[] = [
  { id: "recientes", texto: "Los inscritos más recientes" },
  { id: "actividad", texto: "Actividad más reciente" },
  { id: "nombre", texto: "Nombre (A a Z)" },
  { id: "aprobadas", texto: "Más materias aprobadas" },
  { id: "lecciones", texto: "Más lecciones completadas" },
];
/** Los filtros de la lista de alumnos: las cifras y las barras del inicio llevan a la lista ya filtrada. */
export type FiltroAlumnos = { texto?: string; estatus?: string; materia?: string; iglesia?: string; pais?: string; orden?: OrdenAlumnos; conAlertas?: boolean };

function AlertasDeFila({ a }: { a: AlumnoFila }) {
  if (!a.alertas) return null;
  return (
    <span className="inline-flex items-center gap-2 text-xs" title={a.alertas.titulos.join(" · ")}>
      {a.alertas.alta > 0 && <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400"><AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />{a.alertas.alta}<span className="sr-only"> para atender pronto</span></span>}
      {a.alertas.media > 0 && <span className="inline-flex items-center gap-1 text-orange-600 dark:text-orange-300"><AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />{a.alertas.media}<span className="sr-only"> para mirar</span></span>}
    </span>
  );
}

function Alumnos({ resumen, inicial }: { resumen: DireccionResumen; inicial?: FiltroAlumnos | null }) {
  const enlaces = useEnlaces();
  const q = useDireccionAlumnos();
  const [texto, setTexto] = useState(inicial?.texto ?? "");
  const [estatus, setEstatus] = useState(inicial?.estatus ?? "");
  const [materia, setMateria] = useState(inicial?.materia ?? "");
  const [iglesia, setIglesia] = useState(inicial?.iglesia ?? "");
  const [pais, setPais] = useState(inicial?.pais ?? "");
  const [orden, setOrden] = useState<OrdenAlumnos>(inicial?.orden ?? "recientes");
  const [conAlertas, setConAlertas] = useState(!!inicial?.conAlertas);
  const [verFiltros, setVerFiltros] = useState(false);
  const lista = q.data?.alumnos ?? [];
  const contacto = !!q.data?.puede.contacto;
  const filtrados = useMemo(() => {
    const t = sinTildes(texto.trim());
    const out = lista.filter(
      (a) =>
        (!t || sinTildes([a.nombre, a.matricula, a.correo ?? "", a.telefono ?? "", a.iglesia, a.ciudad].join(" ")).includes(t)) &&
        (!estatus || a.estatus.clave === estatus) &&
        (!materia || a.enCurso.includes(materia)) &&
        (!iglesia || (a.iglesia || "Sin iglesia") === iglesia) &&
        (!pais || a.pais === pais) &&
        (!conAlertas || !!a.alertas),
    );
    const por: Record<OrdenAlumnos, (a: AlumnoFila, b: AlumnoFila) => number> = {
      recientes: (a, b) => b.desde.localeCompare(a.desde),
      actividad: (a, b) => b.ultima.localeCompare(a.ultima),
      nombre: (a, b) => a.nombre.localeCompare(b.nombre, "es"),
      aprobadas: (a, b) => b.aprobadas - a.aprobadas || b.lecciones - a.lecciones,
      lecciones: (a, b) => b.lecciones - a.lecciones || b.aprobadas - a.aprobadas,
    };
    return out.sort(por[orden]);
  }, [lista, texto, estatus, materia, iglesia, pais, orden, conAlertas]);
  const activos = [estatus, materia, iglesia, pais].filter(Boolean).length;
  const conFiltros = !!(texto || activos || conAlertas);
  const limpiar = () => { setTexto(""); setEstatus(""); setMateria(""); setIglesia(""); setPais(""); setConAlertas(false); };
  const cuantosConAlertas = lista.filter((a) => !!a.alertas).length;
  if (q.isLoading) return <p className="text-muted-foreground">Cargando a los alumnos…</p>;
  if (q.error) return <p className="text-sm text-red-600">{q.error.message}</p>;
  return (
    <div className="space-y-3 pb-24" data-testid="direccion-alumnos">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-muted-foreground" aria-hidden="true" />
          <Input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder={contacto ? "Buscar por nombre, matrícula, correo o teléfono" : "Buscar por nombre o matrícula"} className="pl-9 h-11 text-[16px] sm:text-sm" aria-label="Buscar alumnos" data-testid="alumnos-buscar" />
        </div>
        <Button variant={verFiltros || activos ? "default" : "outline"} className={`h-11 gap-2 ${verFiltros || activos ? "fire-btn-primary" : ""}`} onClick={() => setVerFiltros((v) => !v)} aria-expanded={verFiltros} data-testid="alumnos-filtros">
          <SlidersHorizontal className="w-4 h-4" aria-hidden="true" /> <span className="hidden sm:inline">Filtros</span>{activos ? ` (${activos})` : ""}
        </Button>
      </div>
      {verFiltros && (
        <div className="glass-card p-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          <select className={SELECT} value={estatus} onChange={(e) => setEstatus(e.target.value)} aria-label="Filtrar por estatus" data-testid="alumnos-estatus">
            <option value="">Todos los estatus</option>
            {ORDEN_ESTATUS.map((k) => <option key={k} value={k}>{NOMBRE_ESTATUS[k]}</option>)}
          </select>
          <select className={SELECT} value={materia} onChange={(e) => setMateria(e.target.value)} aria-label="Filtrar por materia en curso">
            <option value="">Cursando cualquier materia</option>
            {resumen.materias.filter((m) => m.enCurso > 0 || m.titulo === materia).map((m) => <option key={m.id} value={m.titulo}>{m.titulo}</option>)}
          </select>
          <select className={SELECT} value={iglesia} onChange={(e) => setIglesia(e.target.value)} aria-label="Filtrar por iglesia" data-testid="alumnos-iglesia">
            <option value="">Todas las iglesias</option>
            {resumen.iglesias.map((x) => <option key={x.nombre} value={x.nombre}>{x.nombre}</option>)}
          </select>
          <select className={SELECT} value={pais} onChange={(e) => setPais(e.target.value)} aria-label="Filtrar por país" data-testid="alumnos-pais">
            <option value="">Todos los países</option>
            {resumen.paises.map((x) => <option key={x.nombre} value={x.nombre}>{x.nombre}</option>)}
          </select>
          <select className={SELECT} value={orden} onChange={(e) => setOrden(e.target.value as OrdenAlumnos)} aria-label="Ordenar la lista" data-testid="alumnos-orden">
            {ORDENES.map((o) => <option key={o.id} value={o.id}>{o.texto}</option>)}
          </select>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setConAlertas((v) => !v)}
          aria-pressed={conAlertas}
          className={`rounded-full px-3.5 h-10 text-sm border transition-colors inline-flex items-center gap-1.5 ${conAlertas ? "bg-orange-600 border-orange-600 text-white" : "border-border bg-card hover:border-orange-500"}`}
          data-testid="alumnos-con-alertas"
        >
          <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" /> Necesitan ayuda ({numero(cuantosConAlertas)})
        </button>
        <p className="text-sm text-muted-foreground" data-testid="alumnos-cuantos">
          {filtrados.length === lista.length ? `${numero(lista.length)} ${lista.length === 1 ? "alumno" : "alumnos"}` : `${numero(filtrados.length)} de ${numero(lista.length)}`}
        </p>
        {conFiltros && <Button variant="ghost" size="sm" className="h-10" onClick={limpiar} data-testid="alumnos-limpiar">Quitar los filtros</Button>}
      </div>

      {!filtrados.length && (
        <p className="glass-card p-6 text-center text-sm text-muted-foreground">{lista.length ? "Nadie coincide con la búsqueda." : "Todavía no hay alumnos inscritos. Cuando alguien se inscriba en la academia, aparecerá aquí con su avance."}</p>
      )}

      {/* en el teléfono: una tarjeta por alumno */}
      <ul className="space-y-2 md:hidden" data-testid="tarjetas-alumnos">
        {filtrados.map((a) => (
          <li key={a.userId}>
            <Link href={enlaces.alumno(a.userId)} className="block glass-card p-4 border border-transparent hover:border-orange-500/50 transition">
              <span className="flex items-start justify-between gap-2">
                <span className="min-w-0">
                  <span className="block font-semibold leading-snug">{a.nombre}</span>
                  <span className="block text-xs text-muted-foreground">{[a.matricula, a.pais, a.iglesia].filter(Boolean).join(" · ")}</span>
                </span>
                <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" aria-hidden="true" />
              </span>
              <span className="mt-2 flex flex-wrap items-center gap-2">
                <ChipEstatus e={a.estatus} />
                <AlertasDeFila a={a} />
              </span>
              <span className="mt-2.5 block">
                <Medidor valor={a.aprobadas} de={Math.max(1, a.materias)} etiqueta={`${a.aprobadas} de ${a.materias} materias aprobadas`} />
                <span className="block text-xs mt-1.5">{a.aprobadas} de {a.materias} {a.materias === 1 ? "materia aprobada" : "materias aprobadas"} · {a.lecciones} lecciones · {hace(a.ultima)}</span>
              </span>
              {a.enCurso.length > 0 && <span className="block text-xs text-muted-foreground mt-1 truncate">Cursando: {a.enCurso.join(" · ")}</span>}
              {contacto && (a.telefono || a.correo) && <span className="block text-xs text-muted-foreground mt-1 truncate">{[a.telefono, a.correo].filter(Boolean).join(" · ")}</span>}
            </Link>
          </li>
        ))}
      </ul>

      {/* en la computadora: la tabla */}
      {filtrados.length > 0 && (
        <div className="glass-card p-0 overflow-x-auto hidden md:block">
          <table className="w-full text-sm" data-testid="tabla-alumnos">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-border">
                <th className="py-2.5 px-4 font-medium">Alumno</th>
                <th className="py-2.5 px-3 font-medium">Iglesia</th>
                <th className="py-2.5 px-3 font-medium">Estatus</th>
                <th className="py-2.5 px-3 font-medium">Alertas</th>
                <th className="py-2.5 px-3 font-medium">Avance</th>
                <th className="py-2.5 px-3 font-medium">En curso</th>
                <th className="py-2.5 px-3 font-medium">Última actividad</th>
                {contacto && <th className="py-2.5 px-4 font-medium">Contacto</th>}
              </tr>
            </thead>
            <tbody>
              {filtrados.map((a: AlumnoFila) => (
                <tr key={a.userId} className="border-b border-border/60 last:border-0 align-top hover:bg-muted/40">
                  <td className="py-2.5 px-4">
                    <Link href={enlaces.alumno(a.userId)} className="font-medium hover:underline">{a.nombre}</Link>
                    <span className="block text-xs text-muted-foreground tracking-wider">{a.matricula} · {a.pais}</span>
                  </td>
                  <td className="py-2.5 px-3">{a.iglesia || <span className="text-muted-foreground">—</span>}</td>
                  <td className="py-2.5 px-3"><ChipEstatus e={a.estatus} /></td>
                  <td className="py-2.5 px-3 whitespace-nowrap">{a.alertas ? <AlertasDeFila a={a} /> : <span className="text-muted-foreground">—</span>}</td>
                  <td className="py-2.5 px-3 min-w-[9rem]">
                    <Medidor valor={a.aprobadas} de={Math.max(1, a.materias)} etiqueta={`${a.aprobadas} de ${a.materias} materias aprobadas`} />
                    <span className="block text-xs mt-1 tabular-nums">{a.aprobadas} de {a.materias} · {a.lecciones} lecciones</span>
                  </td>
                  <td className="py-2.5 px-3 max-w-[16rem]">{a.enCurso.length ? a.enCurso.join(" · ") : <span className="text-muted-foreground">—</span>}</td>
                  <td className="py-2.5 px-3 whitespace-nowrap" title={fecha(a.ultima)}>{hace(a.ultima)}</td>
                  {contacto && (
                    <td className="py-2.5 px-4 text-xs">
                      {a.telefono && <span className="block whitespace-nowrap">{a.telefono}</span>}
                      {a.correo && <span className="block">{a.correo}</span>}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/** Pendientes: lo que espera aprobación (la declaración y las materias) y lo que espera revisión. */
function Pendientes({ d, irA }: { d: DireccionResumen; irA: IrA }) {
  const contenido = useContenido(d.puede.contenido);
  const c = contenido.data;
  const faltan = c ? c.total - c.aprobadas : 0;
  if (!d.puede.revisar && !d.puede.contenido) return <p className="text-sm text-muted-foreground">Las aprobaciones y las revisiones las hace solo la Administración.</p>;
  return (
    <div className="space-y-8 pb-24" data-testid="direccion-pendientes">
      {d.puede.contenido && c && (
        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold">Aprobaciones</h2>
          <TarjetaDeclaracionSimple declaracion={c.declaracion} />
          <button type="button" onClick={() => irA("materias", { materias: faltan ? "aprobar" : "todas" })} className="w-full glass-card border border-border p-4 flex items-center gap-3 text-left min-h-[72px] hover:border-orange-500 transition" data-testid="pendientes-materias">
            <span className="rounded-full bg-orange-500/15 p-2.5 shrink-0"><BookCheck className="w-5 h-5 text-orange-600" aria-hidden="true" /></span>
            <span className="flex-1 min-w-0">
              <span className="block font-semibold">{faltan ? `${numero(faltan)} ${faltan === 1 ? "materia" : "materias"} por aprobar` : "Todas las materias están aprobadas"}</span>
              <span className="block text-sm text-muted-foreground">Revisión doctrinal: {numero(c.aprobadas)} de {numero(c.total)} aprobadas{c.abiertas ? ` · ${c.abiertas} ${c.abiertas === 1 ? "observación abierta" : "observaciones abiertas"}` : ""}</span>
            </span>
            <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" aria-hidden="true" />
          </button>
        </section>
      )}
      {d.puede.mentores && <AQuienAcompanar />}
      {d.puede.revisar && <Revisar />}
    </div>
  );
}

/** «A quién acompañar» (Nivel 5): quienes lo pidieron y las personas del Nivel 1 sin mentor, para elegir los mentores. */
function AQuienAcompanar() {
  const enlaces = useEnlaces();
  const q = useAcompanar(true);
  const x = q.data;
  if (!x || (!x.esperan.length && !x.sinMentor.length)) return null;
  return (
    <section id="acompanar-pendientes" className="space-y-3 scroll-mt-24" data-testid="acompanar-pendientes">
      <h2 className="font-display text-xl font-bold">A quién acompañar ({x.esperan.length})</h2>
      <p className="text-sm text-muted-foreground">
        En el Nivel 5 cada alumno acompaña a {x.pide} personas hasta que terminan el Nivel 1. Para elegirlo como mentor, abre el perfil de quien empieza
        (la lista de abajo) y, en «Seguimiento», elige al mentor. El pedido se cumple solo cuando ya acompaña a {x.pide}.
      </p>
      {x.esperan.length > 0 && (
        <ul className="space-y-2">
          {x.esperan.map((a) => (
            <li key={a.userId}>
              <Link href={enlaces.alumno(a.userId)} className="glass-card p-3 flex items-center gap-3 border border-orange-500/40 hover:border-orange-500 transition">
                <Users className="w-5 h-5 text-orange-600 shrink-0" aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold truncate">{a.nombre}</span>
                  <span className="block text-xs text-muted-foreground">Lo pidió {hace(a.pedido)} · acompaña a {a.acompana} de {x.pide}{a.matricula ? ` · ${a.matricula}` : ""}</span>
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      )}
      <details className="glass-card p-4" open={x.esperan.length > 0} data-testid="sin-mentor">
        <summary className="font-semibold cursor-pointer">En el Nivel 1 sin mentor ({x.sinMentor.length})</summary>
        {x.sinMentor.length === 0 ? (
          <p className="text-sm text-muted-foreground mt-2">Todos los del Nivel 1 ya tienen mentor.</p>
        ) : (
          <ul className="mt-2 divide-y divide-border/60">
            {x.sinMentor.map((s) => (
              <li key={s.userId}>
                <Link href={`${enlaces.alumno(s.userId)}?tab=seguimiento`} className="flex items-center gap-3 py-2.5 hover:underline">
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium truncate">{s.nombre}</span>
                    <span className="block text-xs text-muted-foreground">Empezó {hace(s.desde)}{s.matricula ? ` · ${s.matricula}` : ""}</span>
                  </span>
                  <span className="text-sm text-orange-700 dark:text-orange-300 shrink-0">Elegir mentor</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </details>
    </section>
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
    <div className="space-y-8" data-testid="direccion-revisar">
      <section id="pendientes-escritas" className="space-y-3 scroll-mt-24">
        <h2 className="font-display text-xl font-bold">Respuestas escritas ({pendientes.length})</h2>
        <p className="text-sm text-muted-foreground">El corrector las marcó (nota dudosa, texto pegado, copia de la pregunta o fuera de tiempo). Su nota automática vale mientras nadie la cambie; si la cambias, el alumno recibe un aviso con el motivo.</p>
        {pendientes.length ? pendientes.map((it) => <TarjetaRevision key={it.id} item={it} puedeRevisar={ajeno(it.alumno.userId)} />) : <p className="text-sm text-muted-foreground">Nada pendiente.</p>}
      </section>
      <section id="pendientes-apelaciones" className="space-y-3 scroll-mt-24">
        <h2 className="font-display text-xl font-bold">Pedidos de revisión de exámenes ({abiertas.length})</h2>
        <p className="text-sm text-muted-foreground">Cada alumno puede pedirlo una vez por examen, dentro de los 7 días. Revisa sus respuestas, cambia la nota si corresponde y respóndele.</p>
        {abiertas.length ? abiertas.map((a) => <TarjetaApelacion key={a.id} a={a} puedeRevisar={ajeno(a.alumno.userId)} />) : <p className="text-sm text-muted-foreground">No hay pedidos pendientes.</p>}
      </section>
      <ActividadesPorConfirmar ajeno={ajeno} />
      {(cerradas.length > 0 || recientes.length > 0) && (
        <details className="glass-card p-4">
          <summary className="font-semibold cursor-pointer">Lo que ya se revisó hace poco ({cerradas.length + recientes.length})</summary>
          <div className="space-y-3 mt-3">
            {cerradas.map((a) => <TarjetaApelacion key={a.id} a={a} puedeRevisar={false} />)}
            {recientes.map((it) => <TarjetaRevision key={it.id} item={it} puedeRevisar={ajeno(it.alumno.userId)} />)}
          </div>
        </details>
      )}
    </div>
  );
}

function Historial() {
  const enlaces = useEnlaces();
  const q = useHistorial();
  if (q.isLoading) return <p className="text-muted-foreground">Cargando el historial…</p>;
  if (!q.data) return <p className="text-sm text-red-600">{q.error?.message ?? "No se pudo cargar."}</p>;
  const items = q.data.historial;
  return (
    <section className="glass-card p-4 sm:p-5" data-testid="direccion-historial">
      <p className="text-sm text-muted-foreground mb-4">Cada decisión de la Administración, con quién la tomó, cuándo y por qué: notas cambiadas y pedidos respondidos, la gestión del expediente, las actividades confirmadas o devueltas, las evaluaciones del sermón y del proyecto, las defensas programadas, los mentores, la bitácora, los documentos revocados o restaurados, los nombres corregidos, las observaciones y aprobaciones del contenido, las preguntas retiradas y la apertura de la academia.</p>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Todavía no hay cambios.</p>
      ) : (
        <ol className="space-y-4">
          {items.map((h) => (
            <li key={h.id} className="text-sm border-b border-border/60 pb-3 last:border-0">
              <p>
                <span className="font-semibold">{h.por}</span> {h.texto.charAt(0).toLowerCase() + h.texto.slice(1)}
                {h.alumno && <> · <Link href={enlaces.alumno(h.alumno.userId)} className="underline">{h.alumno.nombre}</Link></>}
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
  { id: "inscripcion", texto: "Inscripciones" },
  { id: "materia", texto: "Materias empezadas" },
  { id: "aprobada", texto: "Materias aprobadas" },
  { id: "nivel", texto: "Niveles completos" },
  { id: "especialidad", texto: "Especialidades" },
];

function Registro() {
  const enlaces = useEnlaces();
  const q = useDireccionActividad();
  const [tipo, setTipo] = useState<"" | ActividadItem["tipo"]>("");
  if (q.isLoading) return <p className="text-muted-foreground">Cargando el registro…</p>;
  if (q.error) return <p className="text-sm text-red-600">{q.error.message}</p>;
  const items = (q.data?.actividad ?? []).filter((a) => !tipo || a.tipo === tipo);
  return (
    <div className="space-y-3">
      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1" role="group" aria-label="Filtrar el registro">
        {FILTRO_REGISTRO.map((f) => (
          <button
            key={f.id || "todo"}
            type="button"
            onClick={() => setTipo(f.id)}
            aria-pressed={tipo === f.id}
            className={`shrink-0 rounded-full px-4 h-10 text-sm border transition-colors ${tipo === f.id ? "bg-orange-600 border-orange-600 text-white" : "border-border bg-card hover:border-orange-500"}`}
          >
            {f.texto}
          </button>
        ))}
      </div>
      <section className="glass-card p-4 sm:p-5" data-testid="direccion-registro">
        <ListaActividad items={items} enlaceAlumno={enlaces.alumno} vacio="Nada en el registro con este filtro." />
      </section>
    </div>
  );
}

/** El historial: lo que hacen los alumnos (inscripciones y avances) y las decisiones de la Administración. */
function HistorialSeccion({ d }: { d: DireccionResumen }) {
  const [ver, setVer] = useState<"alumnos" | "administracion">("alumnos");
  return (
    <div className="space-y-3 pb-24">
      {d.puede.revisar && (
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-muted/60 p-1" role="group" aria-label="Qué historial ver">
          {[["alumnos", "De los alumnos"], ["administracion", "De la Administración"]].map(([id, texto]) => (
            <button key={id} type="button" onClick={() => setVer(id as typeof ver)} aria-pressed={ver === id} className={`h-10 rounded-lg text-sm font-medium transition-colors ${ver === id ? "bg-background shadow" : "text-muted-foreground"}`}>{texto}</button>
          ))}
        </div>
      )}
      {ver === "alumnos" || !d.puede.revisar ? <Registro /> : <Historial />}
    </div>
  );
}

function Permisos({ role }: { role: string | null | undefined }) {
  const mio = rolAcademia(role);
  // los alumnos no tienen columna: en la academia cada uno ve solo lo suyo
  const columnas = ROLES_ACADEMIA.filter((r) => r.id !== "alumno");
  return (
    <div className="space-y-5 pb-24" data-testid="direccion-permisos">
      <section className="glass-card p-4 sm:p-5">
        <h2 className="font-semibold flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-orange-600" aria-hidden="true" /> Quién es quién en la academia</h2>
        <p className="text-sm text-muted-foreground mt-1">
          En la <strong>academia</strong> se estudia: cada alumno ve solo lo suyo. La <strong>administración de la academia</strong> la maneja solo la Administración; los maestros, los líderes y las iglesias aliadas solo ven el seguimiento.
        </p>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 text-sm">
          {ROLES_ACADEMIA.map((r) => (
            <li key={r.id} className={`rounded-xl border p-3 ${r.id === mio ? "border-orange-500" : "border-border"}`}>
              <p className="font-semibold">{r.nombre}{r.id === mio ? " · tu rol" : ""}</p>
              <p className="text-muted-foreground mt-0.5">{r.quienes}</p>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground mt-3">El rol de cada cuenta se asigna en Administración → Personas → Miembros. El servidor comprueba estos permisos en cada consulta.</p>
      </section>
      <section className="glass-card p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground border-b border-border">
              <th className="py-2.5 px-4 font-medium">Qué se puede hacer</th>
              {columnas.map((r) => (
                <th key={r.id} className={`py-2.5 px-3 font-medium ${r.id === mio ? "text-foreground" : ""}`}>{r.nombre}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CAPACIDADES.map((c) => (
              <tr key={c.id} className="border-b border-border/60 last:border-0 align-top">
                <td className="py-2.5 px-4">
                  <span className="font-medium">{c.texto}</span>
                  <span className="block text-xs text-muted-foreground">{c.detalle}</span>
                </td>
                {columnas.map((r) => (
                  <td key={r.id} className={`py-2.5 px-3 whitespace-nowrap ${r.id === mio ? "font-semibold" : ""} ${c.alcance[r.id] === "no" ? "text-muted-foreground" : ""}`}>
                    {textoCelda(r.id, c.alcance[r.id])}
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

const SECCIONES = ["inicio", "pendientes", "alumnos", "materias", "laboratorio", "historial", "permisos"] as const;
type Seccion = (typeof SECCIONES)[number];
/** Los nombres de antes (los avisos de la campana y los enlaces guardados siguen funcionando). */
const ALIAS: Record<string, Seccion> = { resumen: "inicio", revisar: "pendientes", contenido: "materias", registro: "historial" };
const seccionDe = (t: string | null | undefined): Seccion => ((SECCIONES as readonly string[]).includes(t ?? "") ? (t as Seccion) : ALIAS[t ?? ""] ?? "inicio");

export default function AcademiaDireccion() {
  const { user } = useAuth();
  const area = useArea();
  const enlaces = useEnlaces();
  const q = useDireccionResumen();
  useTituloAcademia(area.base === "/admin/academia" ? "Administración de la academia" : "Seguimiento de la academia");
  const tabInicial = new URLSearchParams(window.location.search).get("tab");
  const [seccion, setSeccion] = useState<Seccion>(() => seccionDe(tabInicial));
  // los filtros con que se abren las listas (desde una cifra o un pendiente); `vez` las vuelve a armar
  const [filtroAlumnos, setFiltroAlumnos] = useState<{ f: FiltroAlumnos; vez: number } | null>(null);
  const [verMaterias, setVerMaterias] = useState<{ v: VerMaterias; vez: number } | null>(() => (tabInicial === "contenido" ? { v: "aprobar", vez: 1 } : null));
  const contenido = useContenido(!!q.data?.puede.contenido);
  const irA: IrA = (destino, op) => {
    if (op?.alumnos) setFiltroAlumnos((x) => ({ f: op.alumnos as FiltroAlumnos, vez: (x?.vez ?? 0) + 1 }));
    if (op?.materias) setVerMaterias((x) => ({ v: op.materias!, vez: (x?.vez ?? 0) + 1 }));
    const s = seccionDe(destino);
    setSeccion(s);
    window.history.replaceState(null, "", `${window.location.pathname}?tab=${s}`);
    window.setTimeout(() => {
      const el = (op?.ancla && document.getElementById(op.ancla)) || document.getElementById("panel-secciones");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, op?.ancla ? 450 : 30);
  };
  // un aviso de la campana puede pedir bajar a una parte de la sección (&ir=actividades-por-confirmar): se espera a que aparezca
  const irInicial = useRef(new URLSearchParams(window.location.search).get("ir"));
  useEffect(() => {
    const id = irInicial.current;
    if (!id || !q.data) return;
    irInicial.current = null;
    let vueltas = 0;
    const buscar = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else if (++vueltas < 20) window.setTimeout(buscar, 300);
    };
    window.setTimeout(buscar, 300);
  }, [q.data]);
  if (q.isLoading) return <Cargando />;
  if (!q.data) {
    const sinSesion = q.error?.status === 401;
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <Lock className="w-12 h-12 mx-auto text-orange-500" aria-hidden="true" />
          <p className="text-lg mt-4 mb-6">{q.error?.message ?? "No se pudo cargar el panel."}</p>
          {sinSesion ? (
            <a href={loginUrl(area.base)}><Button className="fire-btn-primary h-12 px-7">Entrar</Button></a>
          ) : (
            <Link href="/academia"><Button variant="outline" className="h-12 px-7">Volver a la academia</Button></Link>
          )}
        </div>
      </Layout>
    );
  }
  const d = q.data;
  const administra = d.rol === "direccion";
  const c = contenido.data;
  const porAprobar = c ? c.total - c.aprobadas + (c.declaracion.aprobacion?.vigente ? 0 : 1) : 0;
  const pendientes = (d.puede.revisar ? d.pendientes.escritas + d.pendientes.apelaciones + d.pendientes.actividades + (d.pendientes.acompanar ?? 0) : 0) + (d.puede.contenido ? porAprobar : 0);
  const items: { id: Seccion; texto: string; icono: typeof Inbox; badge?: number; si?: boolean }[] = [
    { id: "inicio", texto: "Inicio", icono: LayoutDashboard },
    { id: "pendientes", texto: "Pendientes", icono: Inbox, badge: pendientes, si: d.puede.revisar || d.puede.contenido },
    { id: "alumnos", texto: "Alumnos", icono: Users, badge: (d.ayudaTotal ?? d.ayuda.length) || undefined },
    { id: "materias", texto: "Materias", icono: BookOpen },
    { id: "laboratorio", texto: "Laboratorio", icono: FlaskConical, si: !!d.puede.laboratorio },
    { id: "historial", texto: "Historial", icono: History },
  ];
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 pt-4 sm:pt-6 pb-10">
        <Link href={area.volver.href} className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" aria-hidden="true" /> {area.volver.texto}</Link>
        <div className="mt-3 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="data-label text-orange-600 dark:text-orange-300">{NOMBRE_ACADEMIA}</p>
            <h1 className="heading-display font-display text-2xl sm:text-4xl mt-1" data-testid="direccion-titulo">
              {administra ? "Administración" : d.alcance === "iglesia" ? "Los alumnos de tu iglesia" : "Seguimiento"}
            </h1>
            <p className="hidden sm:block text-sm text-muted-foreground mt-1" data-testid="direccion-alcance">
              {administra
                ? "Lo que te toca, tus alumnos y las materias. Para estudiar, entra a la academia como cualquier alumno."
                : d.alcance === "iglesia"
                  ? `Los alumnos de ${d.iglesia?.nombre ?? "tu iglesia"}: su avance, sus notas y su ficha. Solo para ver.`
                  : "Todos los alumnos: su avance y sus notas, sin sus datos de contacto. Solo para ver."}
            </p>
          </div>
          {d.puede.exportar && <MenuDescargas laboratorio={d.puede.laboratorio} />}
        </div>

        <nav id="panel-secciones" className="mt-4 -mx-4 px-4 overflow-x-auto scroll-mt-20" aria-label="Secciones del panel">
          <ul className="flex gap-2 w-max pb-1">
            {items.filter((s) => s.si !== false).map((s) => {
              const Icono = s.icono;
              const activa = seccion === s.id;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => irA(s.id)}
                    aria-current={activa ? "page" : undefined}
                    className={`inline-flex items-center gap-2 rounded-full h-11 px-4 text-sm font-medium border whitespace-nowrap transition-colors ${activa ? "bg-orange-600 border-orange-600 text-white" : "bg-card border-border hover:border-orange-500"}`}
                    data-testid={`seccion-${s.id}`}
                  >
                    <Icono className="w-4 h-4" aria-hidden="true" /> {s.texto}
                    {s.badge ? <span className={`rounded-full text-[11px] px-1.5 leading-5 font-semibold ${activa ? "bg-white text-orange-700" : "bg-orange-600 text-white"}`}>{numero(s.badge)}</span> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-5">
          {seccion === "inicio" && (
            <div className="space-y-6 pb-24" data-testid="direccion-inicio">
              {d.puede.abrir && !d.abierta && <Apertura abierta={d.abierta} irA={irA} />}
              <LoQueTeToca d={d} irA={irA} />
              <Cifras d={d} irA={irA} />
              <NecesitanAyuda d={d} irA={irA} enlaceAlumno={enlaces.alumno} />
              <Tendencias d={d} />
              <ActividadYDatos d={d} irA={irA} enlaceAlumno={enlaces.alumno} />
              {d.puede.abrir && d.abierta && <Apertura abierta={d.abierta} irA={irA} />}
              <button type="button" className="text-sm text-muted-foreground underline" onClick={() => irA("permisos")} data-testid="ver-permisos">¿Quién puede ver y hacer qué en el panel?</button>
            </div>
          )}
          {seccion === "pendientes" && <Pendientes d={d} irA={irA} />}
          {seccion === "alumnos" && <Alumnos key={filtroAlumnos?.vez ?? 0} resumen={d} inicial={filtroAlumnos?.f} />}
          {seccion === "materias" && <PanelMaterias key={verMaterias?.vez ?? 0} d={d} inicial={verMaterias?.v} />}
          {seccion === "laboratorio" && d.puede.laboratorio && <InformeLaboratorio enlaceAlumno={enlaces.alumno} />}
          {seccion === "historial" && <HistorialSeccion d={d} />}
          {seccion === "permisos" && <Permisos role={user?.role} />}
        </div>
      </div>
    </Layout>
  );
}
