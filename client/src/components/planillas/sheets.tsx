/**
 * Las hojas imprimibles del curso. Se ven como papel en pantalla y salen tal cual al
 * imprimir o guardar como PDF (ver planillas.css). Siempre en blanco y tinta, sin importar
 * el tema oscuro de la web.
 */
import { Fragment, useId, type ReactNode } from "react";
import { withAccents } from "@shared/labels";
import {
  ATT_SHORT, DEFAULT_BLANK_ITEMS,
  averageAttendance, averageFor, buildAttendanceIndex, categoryLabel, countByStatus, courseGradeAverage,
  fmtDate, fmtLongDate, fmtNumber, fmtPct, fmtShortDate, needsFollowUp, periodText, rosterFor,
  scheduleText, statusLabel, studentAttendance,
  type PlanillaData, type PlanillaSession, type SheetKey, type SheetOptions,
} from "./model";

export type GradeDraft = Record<number, { scores: Record<string, string>; grade: string; observations: string }>;

type SheetProps = { data: PlanillaData; options: SheetOptions };

function SheetLogo({ small = false }: { small?: boolean }) {
  // Ids propios: la llama del encabezado de la web queda oculta al imprimir y sus degradados no sirven.
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <svg viewBox="0 0 40 52" className={small ? "planilla-logo planilla-logo-chico" : "planilla-logo"} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}o`} x1="30%" y1="100%" x2="20%" y2="0%">
          <stop offset="0%" stopColor="#b91c1c" />
          <stop offset="30%" stopColor="#ea580c" />
          <stop offset="65%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id={`${id}i`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="60%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#fffbeb" />
        </linearGradient>
      </defs>
      <path d="M20,3 C22.5,8 31,15 31,25 C31,36.5 26,45 20,48 C14,45 9,36.5 9,25 C9,15 17.5,8 20,3 Z" fill={`url(#${id}o)`} />
      <path
        d="M20,15 C21.5,19.5 25.5,23 25.5,29.5 C25.5,35.5 23,40 20,42 C17,40 14.5,35.5 14.5,29.5 C14.5,23 18.5,19.5 20,15 Z"
        fill={`url(#${id}i)`}
        opacity="0.85"
      />
      <circle cx="20" cy="33" r="3" fill="#ffffff" opacity="0.8" />
    </svg>
  );
}

function CourseInfo({ data, extra }: { data: PlanillaData; extra?: [string, string][] }) {
  const counts = countByStatus(data);
  const enrolled = counts.aprobado + counts.completado;
  const rows: [string, string][] = [
    ["Curso", data.course.title],
    ["Maestro(a)", data.teacher?.name || "—"],
    ["Categoría y nivel", `${categoryLabel(data.course.category)} · Nivel ${data.course.level}`],
    ["Horario", scheduleText(data) || "—"],
    ["Período", periodText(data) || "—"],
    ["Inscritos", data.course.maxStudents ? `${enrolled} de ${data.course.maxStudents} cupos` : String(enrolled)],
    ...(extra || []),
  ];
  return (
    <dl className="planilla-datos">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function SheetHeader({ data, title, subtitle, small = false }: { data: PlanillaData; title: string; subtitle?: string; small?: boolean }) {
  return (
    <header className={small ? "planilla-encabezado planilla-encabezado-chico" : "planilla-encabezado"}>
      <SheetLogo small={small} />
      <div className="planilla-org">
        <p className="planilla-ministerio">Ministerio Avivando el Fuego</p>
        <p className="planilla-escuela">Capacitaciones · Escuela ministerial</p>
      </div>
      <div className="planilla-titulo">
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
        {data.example && <p className="planilla-aviso-ejemplo">Ejemplo con datos ficticios</p>}
      </div>
    </header>
  );
}

function SheetFrame({
  data, title, subtitle, landscape = false, extraInfo, signatures, children,
}: {
  data: PlanillaData;
  title: string;
  subtitle?: string;
  landscape?: boolean;
  extraInfo?: [string, string][];
  signatures?: string[];
  children: ReactNode;
}) {
  return (
    <section className={landscape ? "planilla-hoja planilla-horizontal" : "planilla-hoja"} aria-label={title}>
      {data.example && <div className="planilla-marca-agua" aria-hidden="true">EJEMPLO</div>}
      <SheetHeader data={data} title={title} subtitle={subtitle} />
      <CourseInfo data={data} extra={extraInfo} />
      <div className="planilla-cuerpo">{children}</div>
      {signatures && signatures.length > 0 && (
        <div className="planilla-firmas">
          {signatures.map((s) => (
            <div key={s} className="planilla-firma">{s}</div>
          ))}
        </div>
      )}
      <p className="planilla-generado">
        Generado el {fmtDate(data.generatedAt)} · ministerioavivandoelfuego.com
      </p>
    </section>
  );
}

function BlankRows({ count, cells, start }: { count: number; cells: number; start?: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <tr key={`vacia-${i}`} className="fila-vacia">
          {Array.from({ length: cells }, (_, j) => (
            <td key={j} className={j === 0 ? "col-num" : undefined}>{j === 0 && start !== undefined ? start + i : ""}</td>
          ))}
        </tr>
      ))}
    </>
  );
}

function EmptyRow({ colSpan, text }: { colSpan: number; text: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="celda-vacia">{text}</td>
    </tr>
  );
}

function chunk<T>(list: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out.length ? out : [[]];
}

// ---------------------------------------------------------------- 1. Inscritos
export function InscritosSheet({ data, options }: SheetProps) {
  const students = rosterFor(data, options.includePending);
  const counts = countByStatus(data);
  // Columnas que nadie tiene llenas no ocupan espacio (más lugar para nombres y correos).
  const hasCountry = students.some((s) => s.country);
  const hasChurch = students.some((s) => s.church || s.cargo);
  const cols = 4 + (options.showContact ? 2 : 0) + (hasCountry ? 1 : 0) + (hasChurch ? 1 : 0);
  return (
    <SheetFrame
      data={data}
      title="Lista de inscritos"
      subtitle={options.includePending ? "Aprobados y solicitudes por aprobar" : "Alumnos aprobados"}
      signatures={["Maestro(a) del curso", "Coordinación de capacitaciones"]}
    >
      <table className="planilla-tabla">
        <thead>
          <tr>
            <th className="col-num">N°</th>
            <th>Nombre y apellido</th>
            {options.showContact && (
              <>
                <th>Teléfono</th>
                <th>Correo</th>
              </>
            )}
            {hasCountry && <th>País</th>}
            {hasChurch && <th>Iglesia · cargo</th>}
            <th>Estado</th>
            <th className="col-fecha">Inscripción</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={s.enrollmentId}>
              <td className="col-num">{i + 1}</td>
              <td className="celda-nombre">
                {s.name}
                <span className="celda-sub">@{s.username}</span>
              </td>
              {options.showContact && (
                <>
                  <td className="celda-chica celda-tel">{s.phone || ""}</td>
                  <td className="celda-chica celda-correo">{s.email || ""}</td>
                </>
              )}
              {hasCountry && <td>{withAccents(s.country)}</td>}
              {hasChurch && <td className="celda-chica">{[s.church, withAccents(s.cargo)].filter(Boolean).join(" · ")}</td>}
              <td>
                <span className={`planilla-estado estado-${s.status}`}>{statusLabel(s.status)}</span>
              </td>
              <td className="col-fecha">{fmtDate(s.enrolledAt)}</td>
            </tr>
          ))}
          {!students.length && <EmptyRow colSpan={cols} text="Todavía no hay alumnos inscritos en este curso." />}
          <BlankRows count={3} cells={cols} start={students.length + 1} />
        </tbody>
      </table>
      <p className="planilla-totales">
        En la lista: <b>{students.length}</b> · Aprobados: <b>{counts.aprobado}</b> · Completaron: <b>{counts.completado}</b> ·
        Por aprobar: <b>{counts.solicitado}</b>
        {data.course.maxStudents ? (
          <>
            {" "}· Cupo: <b>{data.course.maxStudents}</b>
          </>
        ) : null}
      </p>
    </SheetFrame>
  );
}

// ---------------------------------------------------------------- 2. Asistencia
const SESSIONS_PER_TABLE = 14;

export function AsistenciaSheet({ data, options }: SheetProps) {
  const students = rosterFor(data, options.includePending);
  const index = buildAttendanceIndex(data);
  const takenIds = new Set(index.taken.map((s) => s.id));
  const columns: (PlanillaSession | null)[] = [...data.sessions, ...Array.from({ length: options.extraColumns }, () => null)];
  const tables = chunk(columns.length ? columns : [null, null, null, null, null, null], SESSIONS_PER_TABLE);
  return (
    <SheetFrame
      data={data}
      landscape
      title="Planilla de asistencia"
      subtitle={options.blank ? "Para llenar a mano" : `${index.taken.length} de ${data.sessions.length} clases con asistencia`}
      signatures={["Maestro(a) del curso", "Coordinación de capacitaciones"]}
    >
      {tables.map((cols, ti) => {
        const last = ti === tables.length - 1;
        const offset = ti * SESSIONS_PER_TABLE;
        return (
          <table key={ti} className="planilla-tabla planilla-asistencia">
            <thead>
              <tr>
                <th className="col-num" rowSpan={2}>N°</th>
                <th rowSpan={2}>Nombre {ti > 0 ? "(continuación)" : ""}</th>
                {cols.map((s, i) => (
                  <th key={i} className="col-marca">{offset + i + 1}</th>
                ))}
                {last && (
                  <>
                    <th className="col-total" rowSpan={2}>Asist.</th>
                    <th className="col-total" rowSpan={2}>Faltas</th>
                    <th className="col-total" rowSpan={2}>%</th>
                  </>
                )}
              </tr>
              <tr>
                {cols.map((s, i) => (
                  <th key={i} className="col-marca col-fecha-clase">{s ? fmtShortDate(s.sessionDate) : "__/__"}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((st, i) => {
                const att = studentAttendance(index, st.userId);
                return (
                  <tr key={st.enrollmentId}>
                    <td className="col-num">{i + 1}</td>
                    <td className="celda-nombre">{st.name}</td>
                    {cols.map((s, j) => {
                      const m = !options.blank && s ? index.mark(s.id, st.userId) : null;
                      const unmarked = !options.blank && s && !m && takenIds.has(s.id);
                      return (
                        <td key={j} className={`col-marca ${m ? `marca-${m}` : unmarked ? "marca-ausente" : ""}`}>
                          {m ? ATT_SHORT[m] : unmarked ? "A" : ""}
                        </td>
                      );
                    })}
                    {last && (
                      <>
                        <td className="col-total">{options.blank ? "" : att.present + att.late}</td>
                        <td className="col-total">{options.blank ? "" : att.absent}</td>
                        <td className="col-total">{options.blank ? "" : fmtPct(att.pct)}</td>
                      </>
                    )}
                  </tr>
                );
              })}
              {!students.length && <EmptyRow colSpan={cols.length + (last ? 5 : 2)} text="Todavía no hay alumnos aprobados en este curso." />}
              <BlankRows count={3} cells={cols.length + (last ? 5 : 2)} start={students.length + 1} />
            </tbody>
            {!options.blank && students.length > 0 && (
              <tfoot>
                <tr>
                  <td colSpan={2} className="celda-pie">Presentes en la clase</td>
                  {cols.map((s, j) => (
                    <td key={j} className="col-marca">{s && takenIds.has(s.id) ? index.presentIn(s.id) : ""}</td>
                  ))}
                  {last && <td colSpan={3} />}
                </tr>
              </tfoot>
            )}
          </table>
        );
      })}
      <p className="planilla-leyenda">
        <b>P</b> Presente · <b>T</b> Tardanza · <b>A</b> Ausente · <b>J</b> Justificado. El porcentaje cuenta presentes y tardanzas
        sobre las clases con asistencia tomada (las justificadas no restan).
      </p>
      {data.sessions.length > 0 && (
        <ol className="planilla-temas">
          {data.sessions.map((s, i) => (
            <li key={s.id}>
              <b>{i + 1}.</b> {fmtShortDate(s.sessionDate)} — {s.title}
            </li>
          ))}
        </ol>
      )}
    </SheetFrame>
  );
}

// ---------------------------------------------------------------- 3. Notas
export function NotasSheet({
  data, options, editing = false, draft, onDraft,
}: SheetProps & {
  editing?: boolean;
  draft?: GradeDraft;
  onDraft?: (enrollmentId: number, field: "grade" | "observations" | { score: string }, value: string) => void;
}) {
  const students = rosterFor(data, options.includePending);
  const realItems = data.course.gradeItems;
  const items = realItems.length ? realItems : DEFAULT_BLANK_ITEMS;
  const blankScores = options.blank || !realItems.length;
  const blankAll = options.blank && !editing;
  const weights = realItems.reduce((a, it) => a + (it.weight || 0), 0);
  const cols = items.length + 6;
  return (
    <SheetFrame
      data={data}
      landscape={items.length > 4}
      title="Planilla de notas"
      subtitle={
        blankAll
          ? "Para llenar a mano"
          : weights > 0
            ? `Promedio ponderado (pesos: ${weights} %)`
            : "Promedio simple de las evaluaciones"
      }
      signatures={["Maestro(a) del curso", "Coordinación de capacitaciones"]}
    >
      <table className="planilla-tabla planilla-notas">
        <thead>
          <tr>
            <th className="col-num">N°</th>
            <th>Nombre y apellido</th>
            {items.map((it) => (
              <th key={it.key} className="col-nota">
                {it.label}
                {it.weight ? <span className="th-sub">{it.weight} %</span> : null}
              </th>
            ))}
            <th className="col-nota">Promedio</th>
            <th className="col-nota col-final">Nota final</th>
            <th>Estado</th>
            <th className="col-obs">Observaciones</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => {
            const d = draft?.[s.enrollmentId];
            const scores = d ? d.scores : s.scores;
            const avg = realItems.length ? averageFor(scores, realItems) : null;
            return (
              <tr key={s.enrollmentId}>
                <td className="col-num">{i + 1}</td>
                <td className="celda-nombre">{s.name}</td>
                {items.map((it) => (
                  <td key={it.key} className="col-nota">
                    {editing && realItems.length ? (
                      <input
                        className="planilla-input"
                        value={scores[it.key] || ""}
                        inputMode="decimal"
                        maxLength={12}
                        aria-label={`${it.label} de ${s.name}`}
                        onChange={(e) => onDraft?.(s.enrollmentId, { score: it.key }, e.target.value)}
                      />
                    ) : blankScores ? "" : scores[it.key] || ""}
                  </td>
                ))}
                <td className="col-nota celda-promedio">{blankAll ? "" : fmtNumber(avg)}</td>
                <td className="col-nota col-final">
                  {editing ? (
                    <input
                      className="planilla-input planilla-input-final"
                      value={d ? d.grade : s.grade || ""}
                      maxLength={20}
                      aria-label={`Nota final de ${s.name}`}
                      onChange={(e) => onDraft?.(s.enrollmentId, "grade", e.target.value)}
                    />
                  ) : blankAll ? "" : s.grade || ""}
                </td>
                <td className="celda-chica">{blankAll ? "" : statusLabel(s.status)}</td>
                <td className="col-obs celda-chica">
                  {editing ? (
                    <input
                      className="planilla-input planilla-input-obs"
                      value={d ? d.observations : s.observations || ""}
                      maxLength={500}
                      aria-label={`Observaciones de ${s.name}`}
                      onChange={(e) => onDraft?.(s.enrollmentId, "observations", e.target.value)}
                    />
                  ) : blankAll ? "" : s.observations || ""}
                </td>
              </tr>
            );
          })}
          {!students.length && <EmptyRow colSpan={cols} text="Todavía no hay alumnos aprobados en este curso." />}
          {!editing && <BlankRows count={2} cells={cols} start={students.length + 1} />}
        </tbody>
      </table>
      <div className="planilla-criterios">
        <span>Escala de notas: ______________</span>
        <span>Nota mínima para aprobar: ______</span>
        <span>Asistencia mínima: ______ %</span>
      </div>
    </SheetFrame>
  );
}

// ---------------------------------------------------------------- 4. Seguimiento
export function SeguimientoSheet({ data, options }: SheetProps) {
  const students = rosterFor(data, options.includePending);
  const index = buildAttendanceIndex(data);
  const rows = students.map((s) => ({ s, att: studentAttendance(index, s.userId) }));
  const flagged = rows.filter((r) => needsFollowUp(r.att)).length;
  return (
    <SheetFrame
      data={data}
      landscape
      title="Planilla de seguimiento"
      subtitle="Asistencia, contacto y acompañamiento de cada alumno"
      signatures={["Maestro(a) del curso", "Consejería / pastoral"]}
    >
      <p className="planilla-resumen-linea">
        {index.taken.length
          ? <>Necesitan una llamada o visita: <b>{flagged}</b> (dos faltas seguidas o menos del 70 % de asistencia).</>
          : <>Aún no se ha pasado asistencia en ninguna clase: la columna «Seguimiento» queda para anotar a mano.</>}
      </p>
      <table className="planilla-tabla planilla-seguimiento">
        <thead>
          <tr>
            <th className="col-num">N°</th>
            <th>Nombre y apellido</th>
            <th>Contacto</th>
            <th className="col-total">Asistió</th>
            <th className="col-total">%</th>
            <th className="col-fecha">Última vez</th>
            <th className="col-total">Faltas seguidas</th>
            <th className="col-total">Nota</th>
            <th className="col-seguimiento">Seguimiento (fecha · llamada o visita · comentario)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ s, att }, i) => {
            const flag = needsFollowUp(att);
            return (
              <tr key={s.enrollmentId} className={flag ? "fila-alerta" : undefined}>
                <td className="col-num">{i + 1}</td>
                <td className="celda-nombre">
                  {s.name}
                  {flag && <span className="planilla-alerta">Contactar</span>}
                  {s.status === "solicitado" && <span className="celda-sub">Por aprobar</span>}
                </td>
                <td className="celda-chica">
                  {s.phone || ""}
                  {s.email ? <span className="celda-sub celda-correo">{s.email}</span> : null}
                </td>
                <td className="col-total">{att.taken ? `${att.present + att.late}/${att.taken}` : ""}</td>
                <td className="col-total">{fmtPct(att.pct)}</td>
                <td className="col-fecha">{fmtDate(att.lastPresent)}</td>
                <td className="col-total">{att.taken ? att.streak : ""}</td>
                <td className="col-total">{s.grade || ""}</td>
                <td className="col-seguimiento celda-chica">{s.observations || ""}</td>
              </tr>
            );
          })}
          {!rows.length && <EmptyRow colSpan={9} text="Todavía no hay alumnos aprobados en este curso." />}
        </tbody>
      </table>
    </SheetFrame>
  );
}

// ---------------------------------------------------------------- 5. Firmas del día
export function FirmasSheet({ data, options }: SheetProps) {
  const students = rosterFor(data, options.includePending);
  const session = data.sessions.find((s) => s.id === options.firmasSessionId) || null;
  return (
    <SheetFrame
      data={data}
      title="Asistencia y firmas de la clase"
      subtitle={session ? fmtLongDate(session.sessionDate) : "Fecha: ____ / ____ / ________"}
      extraInfo={[["Tema de la clase", session ? session.title : "______________________________"]]}
      signatures={["Maestro(a) que dio la clase"]}
    >
      <table className="planilla-tabla planilla-firmas-tabla">
        <thead>
          <tr>
            <th className="col-num">N°</th>
            <th>Nombre y apellido</th>
            <th className="col-firma">Firma</th>
            <th className="col-hora">Hora</th>
            <th className="col-obs">Observación</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={s.enrollmentId} className="fila-firma">
              <td className="col-num">{i + 1}</td>
              <td className="celda-nombre">{s.name}</td>
              <td className="col-firma" />
              <td className="col-hora" />
              <td className="col-obs" />
            </tr>
          ))}
          {!students.length && <EmptyRow colSpan={5} text="Todavía no hay alumnos aprobados: usa los renglones de abajo." />}
          <BlankRows count={students.length ? 2 : 10} cells={5} start={students.length + 1} />
        </tbody>
      </table>
      {options.firmasExtraRows > 0 && (
        <>
          <h3 className="planilla-subtitulo">Visitantes y personas nuevas</h3>
          <table className="planilla-tabla planilla-firmas-tabla">
            <thead>
              <tr>
                <th className="col-num">N°</th>
                <th>Nombre y apellido</th>
                <th>Teléfono / WhatsApp</th>
                <th className="col-firma">Firma</th>
              </tr>
            </thead>
            <tbody>
              <BlankRows count={options.firmasExtraRows} cells={4} start={1} />
            </tbody>
          </table>
        </>
      )}
      <div className="planilla-criterios">
        <span>Total presentes: ______</span>
        <span>Visitantes: ______</span>
        <span>Hora de inicio: ______ · fin: ______</span>
      </div>
    </SheetFrame>
  );
}

// ---------------------------------------------------------------- 6. Resumen y acta
export function ResumenSheet({ data, options }: SheetProps) {
  const counts = countByStatus(data);
  const students = rosterFor(data, false);
  const index = buildAttendanceIndex(data);
  const takenIds = new Set(index.taken.map((s) => s.id));
  const avgAtt = averageAttendance(data, students, index);
  const avgGrade = courseGradeAverage(students);
  const kpis: [string, string][] = [
    ["Alumnos en el curso", String(counts.aprobado + counts.completado)],
    ["Por aprobar", String(counts.solicitado)],
    ["Completaron", String(counts.completado)],
    ["Clases con asistencia", `${index.taken.length} de ${data.sessions.length}`],
    ["Asistencia promedio", avgAtt === null ? "—" : fmtPct(avgAtt)],
    ["Promedio final", avgGrade === null ? "—" : fmtNumber(avgGrade)],
  ];
  return (
    <SheetFrame
      data={data}
      title="Resumen y acta del curso"
      subtitle={options.blank ? undefined : `Al ${fmtLongDate(data.generatedAt)}`}
      signatures={["Maestro(a) del curso", "Coordinación de capacitaciones", "Pastor(a)"]}
    >
      <div className="planilla-kpis">
        {kpis.map(([k, v]) => (
          <div key={k} className="planilla-kpi">
            <span className="kpi-valor">{v}</span>
            <span className="kpi-nombre">{k}</span>
          </div>
        ))}
      </div>
      <h3 className="planilla-subtitulo">Clases del curso</h3>
      <table className="planilla-tabla">
        <thead>
          <tr>
            <th className="col-num">N°</th>
            <th className="col-fecha">Fecha</th>
            <th>Tema</th>
            <th className="col-total">Duración</th>
            <th className="col-total">Presentes</th>
            <th className="col-total">Estado</th>
          </tr>
        </thead>
        <tbody>
          {data.sessions.map((s, i) => (
            <tr key={s.id}>
              <td className="col-num">{i + 1}</td>
              <td className="col-fecha">{fmtDate(s.sessionDate)}</td>
              <td>{s.title}</td>
              <td className="col-total">{s.duration ? `${s.duration} min` : ""}</td>
              <td className="col-total">{takenIds.has(s.id) ? index.presentIn(s.id) : ""}</td>
              <td className="col-total celda-chica">{s.isCompleted || takenIds.has(s.id) ? "Dictada" : "Pendiente"}</td>
            </tr>
          ))}
          {!data.sessions.length && <EmptyRow colSpan={6} text="Todavía no hay clases programadas en la web." />}
        </tbody>
      </table>
      <h3 className="planilla-subtitulo">Acta de notas finales</h3>
      <table className="planilla-tabla">
        <thead>
          <tr>
            <th className="col-num">N°</th>
            <th>Nombre y apellido</th>
            <th className="col-total">Asistencia</th>
            <th className="col-nota col-final">Nota final</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => {
            const att = studentAttendance(index, s.userId);
            return (
              <tr key={s.enrollmentId}>
                <td className="col-num">{i + 1}</td>
                <td className="celda-nombre">{s.name}</td>
                <td className="col-total">{fmtPct(att.pct)}</td>
                <td className="col-nota col-final">{s.grade || ""}</td>
                <td className="celda-chica">{statusLabel(s.status)}</td>
              </tr>
            );
          })}
          {!students.length && <EmptyRow colSpan={5} text="Todavía no hay alumnos aprobados en este curso." />}
        </tbody>
      </table>
    </SheetFrame>
  );
}

// ---------------------------------------------------------------- 7. Ficha de inscripción
function FichaForm({ data }: { data: PlanillaData }) {
  const fields: [string, string?][] = [
    ["Nombre completo"],
    ["Fecha de nacimiento", "half"],
    ["Teléfono / WhatsApp", "half"],
    ["Correo electrónico"],
    ["Ciudad y país", "half"],
    ["Iglesia", "half"],
    ["Pastor(a)", "half"],
    ["Cargo o ministerio", "half"],
  ];
  return (
    <div className="planilla-ficha">
      <SheetHeader data={data} title="Ficha de inscripción" subtitle={data.course.title} small />
      <div className="ficha-campos">
        {fields.map(([label, size]) => (
          <div key={label} className={size === "half" ? "ficha-campo ficha-mitad" : "ficha-campo"}>
            <span>{label}</span>
          </div>
        ))}
        <div className="ficha-campo ficha-opciones">
          <span>Soy:</span>
          <span className="ficha-casilla">Miembro de una iglesia</span>
          <span className="ficha-casilla">Visitante</span>
          <span className="ficha-casilla">Independiente</span>
        </div>
        <div className="ficha-campo">
          <span>¿Cómo se enteró del curso?</span>
        </div>
      </div>
      <div className="planilla-firmas ficha-firmas">
        <div className="planilla-firma">Firma del alumno</div>
        <div className="planilla-firma">Fecha</div>
        <div className="planilla-firma">Recibido por</div>
      </div>
    </div>
  );
}

export function FichaSheet({ data }: SheetProps) {
  return (
    <section className="planilla-hoja planilla-hoja-fichas" aria-label="Ficha de inscripción">
      {data.example && <div className="planilla-marca-agua" aria-hidden="true">EJEMPLO</div>}
      <FichaForm data={data} />
      <div className="ficha-corte" aria-hidden="true"><span>✂ cortar aquí</span></div>
      <FichaForm data={data} />
    </section>
  );
}

// ---------------------------------------------------------------- todas
export function SheetView({
  sheet, data, options, editing, draft, onDraft,
}: SheetProps & {
  sheet: SheetKey;
  editing?: boolean;
  draft?: GradeDraft;
  onDraft?: (enrollmentId: number, field: "grade" | "observations" | { score: string }, value: string) => void;
}) {
  switch (sheet) {
    case "inscritos":
      return <InscritosSheet data={data} options={options} />;
    case "asistencia":
      return <AsistenciaSheet data={data} options={options} />;
    case "notas":
      return <NotasSheet data={data} options={options} editing={editing} draft={draft} onDraft={onDraft} />;
    case "seguimiento":
      return <SeguimientoSheet data={data} options={options} />;
    case "firmas":
      return <FirmasSheet data={data} options={options} />;
    case "resumen":
      return <ResumenSheet data={data} options={options} />;
    case "ficha":
      return <FichaSheet data={data} options={options} />;
  }
}

export function AllSheets({ data, options, keys }: SheetProps & { keys: readonly SheetKey[] }) {
  return (
    <>
      {keys.map((k) => (
        <Fragment key={k}>
          <SheetView sheet={k} data={data} options={options} />
        </Fragment>
      ))}
    </>
  );
}
