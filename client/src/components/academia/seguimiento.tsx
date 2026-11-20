// Piezas del panel de seguimiento y del expediente: indicadores, barras, medidores, el estatus, la tabla de materias, el
// registro de actividad y el expediente (kárdex). Las barras van en un solo tono (naranja 600, validado en claro y en
// oscuro), con el riel de los medidores en un tono más claro del mismo naranja; los números van en el color del texto.
import { Link } from "wouter";
import {
  Award, BookOpen, CheckCircle2, ClipboardCheck, GraduationCap, PauseCircle, Sparkles, UserCheck, UserPlus, UserX,
} from "lucide-react";
import { NOMBRE_ESTATUS, type EstatusAlumno, type EstatusVista } from "@shared/academia-base";
import type { ActividadItem, AlumnoDetalle, MateriaAvance, MateriaReporte } from "@shared/academia-direccion";

export const fecha = (iso: string) => new Date(iso).toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" });
export const numero = (n: number) => n.toLocaleString("es");

/** «hoy», «ayer», «hace 5 días», «hace 2 meses». */
export function hace(iso: string): string {
  const d = Math.floor((Date.now() - Date.parse(iso)) / 86_400_000);
  if (d <= 0) return "hoy";
  if (d === 1) return "ayer";
  if (d < 30) return `hace ${d} días`;
  const m = Math.floor(d / 30);
  if (m < 12) return m === 1 ? "hace un mes" : `hace ${m} meses`;
  const a = Math.floor(m / 12);
  return a === 1 ? "hace un año" : `hace ${a} años`;
}

const PULSABLE =
  "text-left w-full transition hover:-translate-y-0.5 hover:border-orange-500/50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500 cursor-pointer";

/** Un indicador: la etiqueta, la cifra y una nota opcional. Con `alPulsar`, es un botón que lleva a la lista que cuenta. */
export function Indicador({ etiqueta, valor, nota, testId, alPulsar, ayuda }: { etiqueta: string; valor: string | number; nota?: string; testId?: string; alPulsar?: () => void; ayuda?: string }) {
  const cifra = typeof valor === "number" ? numero(valor) : valor;
  const cuerpo = (
    <>
      <p className="text-sm text-muted-foreground">{etiqueta}</p>
      <p className="text-3xl font-semibold mt-1.5 leading-none">{cifra}</p>
      {nota && <p className="text-xs text-muted-foreground mt-2">{nota}</p>}
    </>
  );
  if (!alPulsar) return <div className="glass-card p-4" data-testid={testId}>{cuerpo}</div>;
  return (
    <button type="button" onClick={alPulsar} className={`glass-card p-4 border border-transparent ${PULSABLE}`} data-testid={testId} title={ayuda} aria-label={`${etiqueta}: ${cifra}.${ayuda ? ` ${ayuda}` : ""}`}>
      {cuerpo}
    </button>
  );
}

/**
 * Barras horizontales de una sola serie, sobre una misma base: el título dice qué se cuenta (sin leyenda). Con
 * `alElegir`, cada fila es un botón (por ejemplo, para ver la lista de los alumnos de ese país).
 */
export function Barras({ titulo, filas, vacio = "Todavía no hay datos.", testId, alElegir }: { titulo: string; filas: { nombre: string; n: number }[]; vacio?: string; testId?: string; alElegir?: (nombre: string) => void }) {
  const tope = Math.max(1, ...filas.map((f) => f.n));
  const fila = (f: { nombre: string; n: number }) => (
    <>
      <span className="truncate">{f.nombre}</span>
      <span className="block h-3" aria-hidden="true">
        {f.n > 0 && <span className="block h-3 rounded-r-[4px] bg-orange-600" style={{ width: `${Math.max(2, (100 * f.n) / tope)}%` }} />}
      </span>
      <span className="tabular-nums text-right">{numero(f.n)}</span>
    </>
  );
  const COLUMNAS = "grid grid-cols-[minmax(0,8.5rem)_1fr_2.5rem] sm:grid-cols-[minmax(0,12rem)_1fr_2.5rem] items-center gap-3 text-sm";
  return (
    <section className="glass-card p-5" data-testid={testId}>
      <h3 className="font-semibold mb-3">{titulo}</h3>
      {filas.length === 0 ? (
        <p className="text-sm text-muted-foreground">{vacio}</p>
      ) : (
        <ul className="space-y-1.5">
          {filas.map((f) => (
            <li key={f.nombre} title={`${f.nombre}: ${numero(f.n)}`}>
              {alElegir && f.nombre !== "Otros" && f.n > 0 ? (
                <button type="button" onClick={() => alElegir(f.nombre)} className={`${COLUMNAS} w-full rounded-md px-1 py-1 text-left hover:bg-muted/60 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500`} aria-label={`${f.nombre}: ${numero(f.n)}. Ver la lista`}>
                  {fila(f)}
                </button>
              ) : (
                <div className={`${COLUMNAS} px-1 py-1`}>{fila(f)}</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/** Un medidor: cuánto de un todo. El riel es un tono más claro del mismo naranja. */
export function Medidor({ valor, de = 100, etiqueta }: { valor: number; de?: number; etiqueta: string }) {
  const pct = de > 0 ? Math.max(0, Math.min(100, (100 * valor) / de)) : 0;
  return (
    <span className="block h-2.5 w-full min-w-16 rounded-r-[4px] bg-orange-300 dark:bg-orange-900" role="img" aria-label={etiqueta} title={etiqueta}>
      {pct > 0 && <span className="block h-2.5 rounded-r-[4px] bg-orange-600" style={{ width: `${pct}%` }} />}
    </span>
  );
}

const ICONO_ESTATUS: Record<EstatusAlumno, typeof UserCheck> = {
  aspirante: UserPlus, activo: UserCheck, pausa: PauseCircle, egresado: Award, graduado: GraduationCap, retirado: UserX,
};

/** El estatus del alumno: su ícono y su nombre (nunca solo un color). */
export function ChipEstatus({ e }: { e: EstatusVista }) {
  const Icono = ICONO_ESTATUS[e.clave];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium whitespace-nowrap" title={e.texto}>
      <Icono className="w-3.5 h-3.5" aria-hidden="true" />
      {NOMBRE_ESTATUS[e.clave]}
      {e.honores ? " · Cuadro de honor" : ""}
    </span>
  );
}

/** La tabla de las materias: inscritos, en curso, aprobadas, promedio y avance medio, cada fila con su medidor. */
export function TablaMaterias({ materias, enlace }: { materias: MateriaReporte[]; enlace?: (id: string) => string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" data-testid="tabla-materias">
        <thead>
          <tr className="text-left text-xs text-muted-foreground border-b border-border">
            <th className="py-2 pr-3 font-medium">Materia</th>
            <th className="py-2 px-2 font-medium text-right">Inscritos</th>
            <th className="py-2 px-2 font-medium text-right">En curso</th>
            <th className="py-2 px-2 font-medium text-right">Aprobadas</th>
            <th className="py-2 px-2 font-medium text-right">Promedio</th>
            <th className="py-2 pl-3 font-medium w-[28%]">Avance medio</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((m) => (
            <tr key={m.id} className="border-b border-border/60 last:border-0">
              <td className="py-2.5 pr-3">
                {enlace ? <Link href={enlace(m.id)} className="font-medium hover:underline">{m.titulo}</Link> : <span className="font-medium">{m.titulo}</span>}
                <span className="block text-xs text-muted-foreground">{m.grupo ?? (m.nivel ? `Nivel ${m.nivel}` : "Especialidad")}</span>
              </td>
              <td className="py-2.5 px-2 text-right tabular-nums">{numero(m.inscritos)}</td>
              <td className="py-2.5 px-2 text-right tabular-nums">{numero(m.enCurso)}</td>
              <td className="py-2.5 px-2 text-right tabular-nums">{numero(m.aprobadas)}</td>
              <td className="py-2.5 px-2 text-right tabular-nums">{m.promedio ?? "—"}</td>
              <td className="py-2.5 pl-3">
                <div className="flex items-center gap-2">
                  <Medidor valor={m.avance} etiqueta={`${m.titulo}: avance medio de ${m.avance} % de las lecciones`} />
                  <span className="tabular-nums w-12 text-right whitespace-nowrap">{m.avance} %</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const ICONO_ACTIVIDAD: Record<ActividadItem["tipo"], typeof UserCheck> = { inscripcion: UserPlus, materia: BookOpen, aprobada: CheckCircle2, nivel: GraduationCap, especialidad: Award };

/** El registro: quién se inscribió, en qué materia, qué aprobó y qué nivel o especialidad completó. */
export function ListaActividad({ items, enlaceAlumno, vacio = "Todavía no hay actividad." }: { items: ActividadItem[]; enlaceAlumno?: (id: number) => string; vacio?: string }) {
  if (!items.length) return <p className="text-sm text-muted-foreground">{vacio}</p>;
  return (
    <ol className="space-y-3" data-testid="lista-actividad">
      {items.map((a, i) => {
        const Icono = ICONO_ACTIVIDAD[a.tipo];
        return (
          <li key={`${a.userId}-${a.tipo}-${a.fecha}-${i}`} className="flex items-start gap-3 text-sm">
            <Icono className="w-4 h-4 mt-0.5 text-orange-600 shrink-0" aria-hidden="true" />
            <span className="flex-1 min-w-0">
              {enlaceAlumno ? <Link href={enlaceAlumno(a.userId)} className="font-medium hover:underline">{a.nombre}</Link> : <span className="font-medium">{a.nombre}</span>} {a.texto}
              {a.matricula && <span className="text-muted-foreground"> · {a.matricula}</span>}
            </span>
            <time className="text-xs text-muted-foreground whitespace-nowrap" dateTime={a.fecha} title={new Date(a.fecha).toLocaleString("es")}>{hace(a.fecha)}</time>
          </li>
        );
      })}
    </ol>
  );
}

/** El avance de un alumno en cada materia: lecciones, versículo, examen, nota y certificado. */
/** `alGestionar`: para la Administración, el botón «Gestionar» de cada materia (components/academia/gestion.tsx). */
/** `enlace`: para el panel, el título de cada materia lleva a su página de seguimiento. */
export function TablaAvance({ materias, conCertificado = true, propio = false, alGestionar, enlace }: { materias: MateriaAvance[]; conCertificado?: boolean; propio?: boolean; alGestionar?: (materiaId: string) => void; enlace?: (materiaId: string) => string }) {
  if (!materias.length) return propio ? null : <p className="text-sm text-muted-foreground">Todavía no se inscribió en ninguna materia.</p>;
  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm" data-testid="tabla-avance">
        <thead>
          <tr className="text-left text-xs text-muted-foreground border-b border-border">
            <th className="py-2 pr-3 font-medium">Materia</th>
            <th className="py-2 px-2 font-medium w-[22%]">Lecciones</th>
            <th className="py-2 px-2 font-medium">Versículo</th>
            <th className="py-2 px-2 font-medium">Examen</th>
            <th className="py-2 px-2 font-medium text-right">Nota</th>
            <th className="py-2 pl-2 font-medium">Estado</th>
            {alGestionar && <th className="py-2 pl-2"><span className="sr-only">Gestionar</span></th>}
          </tr>
        </thead>
        <tbody>
          {materias.map((m) => (
            <tr key={m.id} className="border-b border-border/60 last:border-0 align-top">
              <td className="py-2.5 pr-3">
                {enlace ? <Link href={enlace(m.id)} className="font-medium hover:underline">{m.titulo}</Link> : <span className="font-medium">{m.titulo}</span>}
                <span className="block text-xs text-muted-foreground">Inscrito el {fecha(m.inscrita)}</span>
              </td>
              <td className="py-2.5 px-2">
                <div className="flex items-center gap-2">
                  <Medidor valor={m.lecciones} de={m.de} etiqueta={`${m.lecciones} de ${m.de} lecciones`} />
                  <span className="tabular-nums whitespace-nowrap">{m.lecciones}/{m.de}</span>
                </div>
              </td>
              <td className="py-2.5 px-2">{m.versiculo ? <span className="inline-flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-orange-600" aria-hidden="true" /> Aprendido</span> : <span className="text-muted-foreground">Pendiente</span>}</td>
              <td className="py-2.5 px-2">
                {m.intentos ? (
                  <span className="inline-flex items-center gap-1 whitespace-nowrap"><ClipboardCheck className="w-3.5 h-3.5" aria-hidden="true" /> {m.intentos} {m.intentos === 1 ? "intento" : "intentos"}{m.mejor != null ? ` · mejor ${m.mejor}` : ""}</span>
                ) : (
                  <span className="text-muted-foreground">Sin dar</span>
                )}
              </td>
              <td className="py-2.5 px-2 text-right tabular-nums font-semibold">{m.estado === "aprobada" && m.nota != null ? m.nota : "—"}</td>
              <td className="py-2.5 pl-2">
                {m.estado === "aprobada" ? (
                  <span className="inline-flex flex-col">
                    <span className="inline-flex items-center gap-1 font-medium"><CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> Aprobada</span>
                    {m.aprobada && <span className="text-xs text-muted-foreground">el {fecha(m.aprobada)}</span>}
                    {conCertificado && m.certificado && <Link href={`/academia/certificado/${m.certificado}`} className="text-xs underline">Certificado</Link>}
                  </span>
                ) : (
                  <span>En curso</span>
                )}
              </td>
              {alGestionar && (
                <td className="py-2.5 pl-2 text-right">
                  <button
                    type="button"
                    onClick={() => alGestionar(m.id)}
                    className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-medium hover:border-orange-500/60 hover:text-orange-700 dark:hover:text-orange-300 whitespace-nowrap"
                    data-testid={`gestionar-${m.id}`}
                  >
                    Gestionar
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Los niveles completos y los certificados de un alumno (para su expediente, `propio`, y para la Dirección académica). */
export function NivelesYCertificados({ d, propio = false, sinCertificados = false }: { d: AlumnoDetalle; propio?: boolean; sinCertificados?: boolean }) {
  return (
    <div className={`grid gap-5 ${sinCertificados ? "" : "md:grid-cols-2"}`}>
      <section className="glass-card p-5">
        <h3 className="font-semibold mb-3 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-orange-600" /> Niveles</h3>
        {d.niveles.filter((n) => n.completado).length === 0 ? (
          <p className="text-sm text-muted-foreground">{propio ? "Todavía no completaste ningún nivel." : "Todavía no completó ningún nivel."}</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {d.niveles.filter((n) => n.completado).map((n) => (
              <li key={n.n} className="flex items-center justify-between gap-3">
                <span>Nivel {n.n} · {n.nombre}</span>
                <span className="text-muted-foreground whitespace-nowrap">{n.promedio != null ? `Promedio ${n.promedio} · ` : ""}{fecha(n.completado!)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
      {!sinCertificados && <section className="glass-card p-5">
        <h3 className="font-semibold mb-3 flex items-center gap-2"><Award className="w-4 h-4 text-orange-600" /> Certificados</h3>
        {d.certificados.length === 0 ? (
          <p className="text-sm text-muted-foreground">{propio ? "Todavía no tienes certificados." : "Todavía no tiene certificados."}</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {d.certificados.map((c) => (
              <li key={c.codigo} className="flex items-center justify-between gap-3">
                <Link href={`/academia/certificado/${c.codigo}`} className="hover:underline min-w-0 truncate">{c.titulo}</Link>
                <span className="text-muted-foreground whitespace-nowrap tracking-wider text-xs">{c.revocado ? "Revocado" : c.codigo}</span>
              </li>
            ))}
          </ul>
        )}
      </section>}
    </div>
  );
}
