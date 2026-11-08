/**
 * Planillas del curso: tipos, cálculos (asistencia, promedios, seguimiento), Excel (CSV) y
 * el curso de ejemplo con datos ficticios. Todo se calcula en el navegador a partir de una
 * sola consulta al servidor (/api/courses/:id/planillas).
 */
import { COURSE_CATEGORIES, DAYS_OF_WEEK, ENROLLMENT_STATUSES } from "@shared/schema";

export type GradeItem = { key: string; label: string; weight?: number | null };
export type AttendanceStatus = "presente" | "ausente" | "tardanza" | "excusado";

export type PlanillaStudent = {
  enrollmentId: number;
  userId: number;
  name: string;
  username: string;
  email: string | null;
  phone: string | null;
  country: string | null;
  cargo: string | null;
  church: string | null;
  memberType: string | null;
  status: string;
  grade: string | null;
  scores: Record<string, string>;
  observations: string | null;
  enrolledAt: string | null;
  completedAt: string | null;
};

export type PlanillaSession = {
  id: number;
  title: string;
  sessionDate: string;
  duration: number | null;
  isCompleted: boolean;
};

export type PlanillaData = {
  course: {
    id: number;
    title: string;
    description: string;
    category: string;
    level: number;
    maxStudents: number | null;
    enrollmentStatus: string;
    isActive: boolean;
    createdAt: string | null;
    gradeItems: GradeItem[];
  };
  teacher: { id: number; name: string } | null;
  schedule: { dayOfWeek: number; startTime: string; endTime: string; specificDate: string | null; description: string | null }[];
  sessions: PlanillaSession[];
  students: PlanillaStudent[];
  attendance: { sessionId: number; userId: number; status: string }[];
  generatedAt: string;
  /** Curso de ejemplo con datos ficticios (no viene del servidor). */
  example?: boolean;
};

export const SHEETS = [
  { key: "inscritos", label: "Inscritos", title: "Lista de inscritos" },
  { key: "asistencia", label: "Asistencia", title: "Planilla de asistencia" },
  { key: "notas", label: "Notas", title: "Planilla de notas" },
  { key: "seguimiento", label: "Seguimiento", title: "Planilla de seguimiento" },
  { key: "firmas", label: "Firmas del día", title: "Asistencia y firmas de la clase" },
  { key: "resumen", label: "Resumen", title: "Resumen y acta del curso" },
  { key: "ficha", label: "Ficha", title: "Ficha de inscripción" },
] as const;
export type SheetKey = (typeof SHEETS)[number]["key"];

export type SheetOptions = {
  /** Incluir solicitudes pendientes de aprobar. */
  includePending: boolean;
  /** Inscritos: mostrar correo y teléfono. */
  showContact: boolean;
  /** Asistencia y notas: planilla en blanco para llenar a mano. */
  blank: boolean;
  /** Asistencia: columnas vacías extra para clases que aún no están en la web. */
  extraColumns: number;
  /** Firmas: la clase elegida (null = fecha en blanco). */
  firmasSessionId: number | null;
  /** Firmas: renglones para visitantes. */
  firmasExtraRows: number;
};

export const DEFAULT_OPTIONS: SheetOptions = {
  includePending: false,
  showContact: true,
  blank: false,
  extraColumns: 4,
  firmasSessionId: null,
  firmasExtraRows: 6,
};

export const ATT_SHORT: Record<AttendanceStatus, string> = { presente: "P", ausente: "A", tardanza: "T", excusado: "J" };
export const ATT_LABEL: Record<AttendanceStatus, string> = {
  presente: "Presente",
  ausente: "Ausente",
  tardanza: "Tardanza",
  excusado: "Justificado",
};
export const ATT_ORDER: AttendanceStatus[] = ["presente", "tardanza", "ausente", "excusado"];

/** Columnas de la planilla de notas cuando el curso aún no tiene evaluaciones. */
export const DEFAULT_BLANK_ITEMS: GradeItem[] = [
  { key: "b1", label: "Evaluación 1" },
  { key: "b2", label: "Evaluación 2" },
  { key: "b3", label: "Evaluación 3" },
  { key: "b4", label: "Trabajo final" },
];

// ---------------------------------------------------------------- formatos
function toDate(value?: string | Date | null): Date | null {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function fmtDate(value?: string | Date | null): string {
  const d = toDate(value);
  return d ? d.toLocaleDateString("es", { day: "2-digit", month: "2-digit", year: "numeric" }) : "";
}

export function fmtLongDate(value?: string | Date | null): string {
  const d = toDate(value);
  return d ? d.toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "";
}

export function fmtShortDate(value?: string | Date | null): string {
  const d = toDate(value);
  return d ? d.toLocaleDateString("es", { day: "2-digit", month: "2-digit" }) : "";
}

export function fmtNumber(n: number | null | undefined, digits = 1): string {
  if (n === null || n === undefined || Number.isNaN(n)) return "";
  return n.toLocaleString("es-419", { maximumFractionDigits: digits, minimumFractionDigits: 0 });
}

export function fmtPct(n: number | null | undefined): string {
  if (n === null || n === undefined) return "";
  return `${Math.round(n * 100)} %`;
}

/** "19:00" → "7:00 p. m." */
export function fmtTime(hhmm: string): string {
  const m = /^(\d{1,2}):(\d{2})/.exec(hhmm || "");
  if (!m) return hhmm || "";
  const h = Number(m[1]);
  const suffix = h >= 12 ? "p. m." : "a. m.";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m[2]} ${suffix}`;
}

export function categoryLabel(category: string): string {
  return (COURSE_CATEGORIES as Record<string, string>)[category] || category;
}

export function statusLabel(status: string): string {
  return (ENROLLMENT_STATUSES as Record<string, string>)[status] || status;
}

const DAYS_ES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export function scheduleText(data: PlanillaData): string {
  if (!data.schedule.length) return "";
  return data.schedule
    .map((s) => {
      const day = s.specificDate
        ? fmtDate(s.specificDate)
        : DAYS_ES[s.dayOfWeek] || (DAYS_OF_WEEK as Record<number, string>)[s.dayOfWeek] || "";
      return `${day} ${fmtTime(s.startTime)} – ${fmtTime(s.endTime)}`.trim();
    })
    .join(" · ");
}

export function periodText(data: PlanillaData): string {
  if (!data.sessions.length) return "";
  const first = data.sessions[0].sessionDate;
  const last = data.sessions[data.sessions.length - 1].sessionDate;
  return first === last ? fmtDate(first) : `${fmtDate(first)} al ${fmtDate(last)}`;
}

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "curso";
}

// ---------------------------------------------------------------- alumnos
const byName = (a: PlanillaStudent, b: PlanillaStudent) => a.name.localeCompare(b.name, "es", { sensitivity: "base" });

/** Alumnos de las planillas: aprobados y completados (y, si se pide, las solicitudes). */
export function rosterFor(data: PlanillaData, includePending: boolean): PlanillaStudent[] {
  return data.students
    .filter((s) => s.status === "aprobado" || s.status === "completado" || (includePending && s.status === "solicitado"))
    .sort(byName);
}

export function countByStatus(data: PlanillaData) {
  const counts = { solicitado: 0, aprobado: 0, completado: 0, rechazado: 0 };
  for (const s of data.students) {
    if (s.status in counts) counts[s.status as keyof typeof counts]++;
  }
  return counts;
}

// ---------------------------------------------------------------- asistencia
export type AttendanceIndex = {
  /** Clases en las que ya se pasó asistencia (al menos una marca), en orden de fecha. */
  taken: PlanillaSession[];
  mark: (sessionId: number, userId: number) => AttendanceStatus | null;
  /** Presentes (y tardanzas) por clase. */
  presentIn: (sessionId: number) => number;
};

export function buildAttendanceIndex(data: PlanillaData): AttendanceIndex {
  const marks = new Map<string, AttendanceStatus>();
  const sessionsWithMarks = new Set<number>();
  const present = new Map<number, number>();
  for (const a of data.attendance) {
    const status = a.status as AttendanceStatus;
    marks.set(`${a.sessionId}:${a.userId}`, status);
    sessionsWithMarks.add(a.sessionId);
    if (status === "presente" || status === "tardanza") present.set(a.sessionId, (present.get(a.sessionId) || 0) + 1);
  }
  const taken = data.sessions
    .filter((s) => sessionsWithMarks.has(s.id))
    .sort((a, b) => new Date(a.sessionDate).getTime() - new Date(b.sessionDate).getTime());
  return {
    taken,
    mark: (sessionId, userId) => marks.get(`${sessionId}:${userId}`) || null,
    presentIn: (sessionId) => present.get(sessionId) || 0,
  };
}

export type StudentAttendance = {
  present: number;
  late: number;
  absent: number;
  excused: number;
  /** Clases con asistencia tomada. */
  taken: number;
  /** (presentes + tardanzas) / (clases tomadas − justificadas). */
  pct: number | null;
  lastPresent: string | null;
  /** Faltas seguidas en las últimas clases. */
  streak: number;
};

/**
 * En una clase donde se pasó asistencia, quien no tiene marca cuenta como ausente
 * (se pasó lista y no estaba). Las clases sin ninguna marca no cuentan.
 */
export function studentAttendance(index: AttendanceIndex, userId: number): StudentAttendance {
  const r: StudentAttendance = { present: 0, late: 0, absent: 0, excused: 0, taken: index.taken.length, pct: null, lastPresent: null, streak: 0 };
  for (const s of index.taken) {
    const m = index.mark(s.id, userId) || "ausente";
    if (m === "presente") r.present++;
    else if (m === "tardanza") r.late++;
    else if (m === "excusado") r.excused++;
    else r.absent++;
    if (m === "presente" || m === "tardanza") r.lastPresent = s.sessionDate;
  }
  for (let i = index.taken.length - 1; i >= 0; i--) {
    const m = index.mark(index.taken[i].id, userId) || "ausente";
    if (m === "excusado") continue;
    if (m !== "ausente") break;
    r.streak++;
  }
  const base = r.taken - r.excused;
  r.pct = base > 0 ? (r.present + r.late) / base : null;
  return r;
}

/** Necesita una llamada o visita: 2 faltas seguidas o menos del 70 % de asistencia. */
export function needsFollowUp(att: StudentAttendance): boolean {
  return att.streak >= 2 || (att.taken >= 2 && att.pct !== null && att.pct < 0.7);
}

export function averageAttendance(data: PlanillaData, students: PlanillaStudent[], index: AttendanceIndex): number | null {
  const values = students.map((s) => studentAttendance(index, s.userId).pct).filter((v): v is number => v !== null);
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : null;
}

// ---------------------------------------------------------------- notas
/** "18", "18,5", "95 %" → número; otra cosa → null. */
export function parseScore(value?: string | null): number | null {
  if (!value) return null;
  const clean = value.replace("%", "").replace(",", ".").trim();
  if (!/^-?\d+(\.\d+)?$/.test(clean)) return null;
  return Number(clean);
}

/** Promedio de las evaluaciones: ponderado si tienen peso, si no, simple. */
export function averageFor(scores: Record<string, string>, items: GradeItem[]): number | null {
  const values = items
    .map((item) => ({ value: parseScore(scores[item.key]), weight: item.weight ?? null }))
    .filter((v): v is { value: number; weight: number | null } => v.value !== null);
  if (!values.length) return null;
  const weighted = values.filter((v) => v.weight && v.weight > 0);
  if (weighted.length === values.length) {
    const total = weighted.reduce((a, v) => a + (v.weight as number), 0);
    return weighted.reduce((a, v) => a + v.value * (v.weight as number), 0) / total;
  }
  return values.reduce((a, v) => a + v.value, 0) / values.length;
}

export function courseGradeAverage(students: PlanillaStudent[]): number | null {
  const values = students.map((s) => parseScore(s.grade)).filter((v): v is number => v !== null);
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : null;
}

export function newGradeKey(label: string, taken: Set<string>): string {
  const base = slugify(label).replace(/-/g, "_").slice(0, 16) || "eval";
  let key = base;
  let i = 2;
  while (taken.has(key)) key = `${base}_${i++}`.slice(0, 24);
  return key;
}

// ---------------------------------------------------------------- Excel (CSV)
type Cell = string | number | null | undefined;

export function toCsv(rows: Cell[][]): string {
  return rows
    .map((row) => row.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(","))
    .join("\r\n");
}

export function downloadCsv(filename: string, rows: Cell[][]) {
  const blob = new Blob(["﻿" + toCsv(rows)], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Filas del Excel de cada planilla (lo mismo que se imprime). */
export function sheetRows(key: SheetKey, data: PlanillaData, options: SheetOptions): Cell[][] {
  const students = rosterFor(data, options.includePending);
  const index = buildAttendanceIndex(data);
  const items = data.course.gradeItems.length ? data.course.gradeItems : DEFAULT_BLANK_ITEMS;
  switch (key) {
    case "inscritos":
      return [
        ["N°", "Nombre", "Usuario", "Correo", "Teléfono", "País", "Iglesia", "Cargo", "Estado", "Fecha de inscripción"],
        ...students.map((s, i) => [i + 1, s.name, s.username, s.email, s.phone, s.country, s.church, s.cargo, statusLabel(s.status), fmtDate(s.enrolledAt)]),
      ];
    case "asistencia": {
      const sessions = data.sessions;
      return [
        ["N°", "Nombre", ...sessions.map((s) => `${fmtShortDate(s.sessionDate)} ${s.title}`), "Presentes", "Tardanzas", "Ausencias", "Justificadas", "% asistencia"],
        ...students.map((s, i) => {
          const att = studentAttendance(index, s.userId);
          return [
            i + 1,
            s.name,
            ...sessions.map((ses) => {
              const m = index.mark(ses.id, s.userId);
              return m ? ATT_SHORT[m] : "";
            }),
            att.present, att.late, att.absent, att.excused, fmtPct(att.pct),
          ];
        }),
      ];
    }
    case "notas":
      return [
        ["N°", "Nombre", ...items.map((it) => (it.weight ? `${it.label} (${it.weight} %)` : it.label)), "Promedio", "Nota final", "Estado", "Observaciones"],
        ...students.map((s, i) => [
          i + 1,
          s.name,
          ...items.map((it) => s.scores[it.key] || ""),
          fmtNumber(averageFor(s.scores, items)),
          s.grade || "",
          statusLabel(s.status),
          s.observations || "",
        ]),
      ];
    case "seguimiento":
      return [
        ["N°", "Nombre", "Teléfono", "Correo", "Asistencias", "Clases tomadas", "% asistencia", "Última asistencia", "Faltas seguidas", "Nota final", "Estado", "¿Contactar?"],
        ...students.map((s, i) => {
          const att = studentAttendance(index, s.userId);
          return [
            i + 1, s.name, s.phone, s.email, att.present + att.late, att.taken, fmtPct(att.pct),
            fmtDate(att.lastPresent), att.streak, s.grade || "", statusLabel(s.status), needsFollowUp(att) ? "Sí" : "",
          ];
        }),
      ];
    case "firmas": {
      const session = data.sessions.find((s) => s.id === options.firmasSessionId);
      return [
        ["Clase", session ? session.title : "", "Fecha", session ? fmtDate(session.sessionDate) : ""],
        ["N°", "Nombre", "Firma", "Hora de llegada", "Observación"],
        ...students.map((s, i) => [i + 1, s.name, "", "", ""]),
      ];
    }
    case "resumen": {
      const counts = countByStatus(data);
      return [
        ["Curso", data.course.title],
        ["Maestro(a)", data.teacher?.name || ""],
        ["Inscritos (aprobados y completados)", counts.aprobado + counts.completado],
        ["Solicitudes pendientes", counts.solicitado],
        ["Completaron el curso", counts.completado],
        ["Clases programadas", data.sessions.length],
        ["Clases con asistencia tomada", index.taken.length],
        ["Asistencia promedio", fmtPct(averageAttendance(data, students, index))],
        ["Promedio de notas finales", fmtNumber(courseGradeAverage(students))],
        [],
        ["N°", "Fecha", "Tema", "Presentes"],
        ...data.sessions.map((s, i) => [i + 1, fmtDate(s.sessionDate), s.title, index.taken.some((t) => t.id === s.id) ? index.presentIn(s.id) : ""]),
      ];
    }
    case "ficha":
      return [["Nombre completo", "Fecha de nacimiento", "Teléfono / WhatsApp", "Correo", "Ciudad y país", "Iglesia", "Pastor(a)", "Cargo o ministerio", "Firma"]];
  }
}

// ---------------------------------------------------------------- curso de ejemplo
const EXAMPLE_NAMES: [string, string][] = [
  ["Ana Martínez", "Estados Unidos"],
  ["Carlos Pérez", "Venezuela"],
  ["Daniela Rojas", "Colombia"],
  ["Eduardo Gómez", "México"],
  ["Fabiola Torres", "Estados Unidos"],
  ["Gabriel Sánchez", "Venezuela"],
  ["Hilda Ramírez", "Honduras"],
  ["Iván Castillo", "Estados Unidos"],
  ["Julia Mendoza", "Perú"],
  ["Kevin Herrera", "Estados Unidos"],
  ["Lucía Vargas", "México"],
  ["Manuel Ortega", "Venezuela"],
];
const EXAMPLE_PENDING: [string, string][] = [
  ["Natalia Ríos", "Estados Unidos"],
  ["Óscar Fuentes", "Colombia"],
];
const EXAMPLE_TOPICS = [
  "La Palabra de Dios",
  "¿Quién es Dios?",
  "Jesucristo, nuestro Salvador",
  "El Espíritu Santo",
  "La vida de oración",
  "La iglesia y la comunión",
  "El bautismo",
  "La Santa Cena",
];
// Marcas por alumno en las 6 clases ya dadas (P presente, T tardanza, A ausente, J justificada).
const EXAMPLE_MARKS = [
  "PPPPPP", "PPTPPP", "PPPPJP", "PAPPPP", "PPPPPP", "TPPPTP",
  "PPPAPP", "PPPAAA", "PPPPPP", "PAPAPA", "PPPPPT", "JPPPPP",
];
const EXAMPLE_SCORES: [string, string, string][] = [
  ["19", "18", "20"], ["17", "16", "18"], ["18", "19", "19"], ["15", "14", "16"],
  ["20", "19", "20"], ["16", "17", "15"], ["18", "17", "18"], ["14", "12", ""],
  ["19", "20", "19"], ["13", "15", "14"], ["17", "18", "17"], ["16", "16", "18"],
];

/** Curso de ejemplo con datos ficticios: para ver cómo quedan las planillas. */
export function buildExampleData(now = new Date()): PlanillaData {
  const firstClass = new Date(now);
  firstClass.setHours(19, 0, 0, 0);
  // Martes de hace 6 semanas
  firstClass.setDate(firstClass.getDate() - ((firstClass.getDay() + 7 - 2) % 7) - 7 * 5);
  const sessions: PlanillaSession[] = EXAMPLE_TOPICS.map((title, i) => {
    const d = new Date(firstClass);
    d.setDate(d.getDate() + 7 * i);
    return { id: -(i + 1), title, sessionDate: d.toISOString(), duration: 90, isCompleted: i < 6 };
  });
  const students: PlanillaStudent[] = [...EXAMPLE_NAMES, ...EXAMPLE_PENDING].map(([name, country], i) => {
    const pending = i >= EXAMPLE_NAMES.length;
    const user = slugify(name).replace(/-/g, ".");
    const enrolled = new Date(firstClass);
    enrolled.setDate(enrolled.getDate() - 10 + (pending ? 30 : i % 5));
    const sc = EXAMPLE_SCORES[i];
    return {
      enrollmentId: -(i + 1),
      userId: -(i + 1),
      name,
      username: user,
      email: `${user}@example.com`,
      phone: `+1 (555) 010-01${String(i + 1).padStart(2, "0")}`,
      country,
      cargo: i % 4 === 0 ? "Servidor(a)" : null,
      church: i % 3 === 0 ? "Iglesia de ejemplo" : null,
      memberType: "independiente",
      status: pending ? "solicitado" : "aprobado",
      grade: null,
      scores: (sc ? { e1: sc[0], e2: sc[1], tareas: sc[2] } : {}) as Record<string, string>,
      observations: i === 7 ? "Faltó las últimas 3 clases: llamar" : null,
      enrolledAt: enrolled.toISOString(),
      completedAt: null,
    };
  });
  const attendance: PlanillaData["attendance"] = [];
  const code: Record<string, AttendanceStatus> = { P: "presente", T: "tardanza", A: "ausente", J: "excusado" };
  EXAMPLE_MARKS.forEach((row, si) => {
    row.split("").forEach((m, ci) => {
      attendance.push({ sessionId: sessions[ci].id, userId: students[si].userId, status: code[m] });
    });
  });
  return {
    course: {
      id: 0,
      title: "Fundamentos de la fe — Nivel 1",
      description: "Curso de ejemplo con datos ficticios, para ver cómo quedan las planillas.",
      category: "doctrina",
      level: 1,
      maxStudents: 20,
      enrollmentStatus: "open",
      isActive: true,
      createdAt: firstClass.toISOString(),
      gradeItems: [
        { key: "e1", label: "Evaluación 1", weight: 20 },
        { key: "e2", label: "Evaluación 2", weight: 20 },
        { key: "tareas", label: "Tareas", weight: 20 },
        { key: "final", label: "Examen final", weight: 40 },
      ],
    },
    teacher: { id: 0, name: "Maestra de ejemplo" },
    schedule: [{ dayOfWeek: 2, startTime: "19:00", endTime: "20:30", specificDate: null, description: null }],
    sessions,
    students,
    attendance,
    generatedAt: now.toISOString(),
    example: true,
  };
}
