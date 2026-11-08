/**
 * Planillas del curso para maestros y administración: lista de inscritos, asistencia,
 * notas, seguimiento, firmas del día, resumen con acta y ficha de inscripción. Se imprimen
 * (o se guardan como PDF) y se descargan para Excel. /planillas/ejemplo muestra un curso
 * de ejemplo con datos ficticios.
 */
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { createPortal, flushSync } from "react-dom";
import { Link, useLocation, useRoute } from "wouter";
import {
  ArrowLeft, BarChart3, ClipboardCheck, FileSpreadsheet, FileText, GraduationCap, HeartHandshake, Info,
  Loader2, Pencil, PenLine, Plus, Printer, Save, Settings2, Trash2, Users, X,
} from "lucide-react";
import "@/planillas.css";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { isAdminRole, isTeacherOrAdminRole } from "@/lib/utils";
import { useCoursePlanillas, useSaveCourseGrades, type GradeRowInput } from "@/hooks/use-planillas";
import { AttendanceDialog } from "@/components/planillas/AttendanceDialog";
import { AllSheets, SheetView, type GradeDraft } from "@/components/planillas/sheets";
import {
  DEFAULT_OPTIONS, SHEETS, buildExampleData, downloadCsv, fmtDate, newGradeKey, rosterFor, sheetRows, slugify,
  type GradeItem, type PlanillaData, type PlanillaSession, type SheetKey, type SheetOptions,
} from "@/components/planillas/model";

const SHEET_ICONS: Record<SheetKey, typeof Users> = {
  inscritos: Users,
  asistencia: ClipboardCheck,
  notas: GraduationCap,
  seguimiento: HeartHandshake,
  firmas: PenLine,
  resumen: BarChart3,
  ficha: FileText,
};

const SHEET_HELP: Record<SheetKey, string> = {
  inscritos: "Quiénes están inscritos, con su contacto y estado. Trae renglones vacíos para anotar a mano a quien llegue nuevo.",
  asistencia: "Una columna por clase (P, T, A, J). Sale en hoja horizontal. Puedes sacarla en blanco para pasar lista a mano.",
  notas: "Las evaluaciones del curso, el promedio, la nota final y observaciones. Puedes escribir las notas aquí mismo.",
  seguimiento: "Para acompañar a cada alumno: asistencia, última vez que vino, faltas seguidas y espacio para anotar llamadas o visitas.",
  firmas: "La hoja que se pasa en el salón el día de la clase: nombre, firma y hora, más renglones para visitantes.",
  resumen: "Números del curso, la lista de clases con sus presentes y el acta de notas finales para firmar.",
  ficha: "Ficha en blanco para inscribir en persona (dos por hoja, para cortar).",
};

const PENDING_SHEETS: SheetKey[] = ["inscritos", "asistencia", "notas", "seguimiento", "firmas"];

/** Las hojas que se imprimen viven fuera de la app: al imprimir se oculta todo lo demás. */
function PrintPortal({ children }: { children: ReactNode }) {
  const [el, setEl] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const div = document.createElement("div");
    div.id = "planillas-print";
    document.body.appendChild(div);
    setEl(div);
    return () => {
      div.remove();
    };
  }, []);
  return el ? createPortal(children, el) : null;
}

function initialSheet(): SheetKey {
  try {
    const hoja = new URLSearchParams(window.location.search).get("hoja");
    if (hoja && SHEETS.some((s) => s.key === hoja)) return hoja as SheetKey;
  } catch {
    /* sin parámetros */
  }
  return "inscritos";
}

function normalizeScores(scores: Record<string, string>): string {
  return JSON.stringify(
    Object.entries(scores)
      .map(([k, v]) => [k, (v || "").trim()] as const)
      .filter(([, v]) => v)
      .sort(([a], [b]) => a.localeCompare(b)),
  );
}

function Gate({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <div className="container mx-auto max-w-xl px-4 py-16 text-center">{children}</div>
    </Layout>
  );
}

function Toggle({ id, label, checked, onChange }: { id: string; label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center gap-2">
      <Switch id={id} checked={checked} onCheckedChange={onChange} />
      <Label htmlFor={id} className="cursor-pointer font-normal">{label}</Label>
    </div>
  );
}

function EvaluacionesDialog({
  open, onOpenChange, items, saving, onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: GradeItem[];
  saving: boolean;
  onSave: (items: GradeItem[]) => void;
}) {
  const [list, setList] = useState<GradeItem[]>(items);
  useEffect(() => {
    if (open) setList(items.map((i) => ({ ...i })));
    // Solo al abrir: mientras está abierto, la lista es la que se va editando.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  const withWeight = list.filter((i) => i.weight !== null && i.weight !== undefined && i.weight > 0).length;
  const total = list.reduce((a, i) => a + (i.weight || 0), 0);
  const mixed = withWeight > 0 && withWeight < list.length;
  const emptyLabel = list.some((i) => !i.label.trim());

  const add = () => {
    const label = `Evaluación ${list.length + 1}`;
    setList([...list, { key: newGradeKey(label, new Set(list.map((i) => i.key))), label, weight: null }]);
  };
  const update = (index: number, patch: Partial<GradeItem>) => setList(list.map((it, i) => (i === index ? { ...it, ...patch } : it)));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Evaluaciones del curso</DialogTitle>
          <DialogDescription>
            Son las columnas de la planilla de notas. Ponles peso en % si unas valen más que otras; si no, el promedio es simple.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {list.map((it, i) => (
            <div key={it.key} className="flex items-center gap-2">
              <Input
                value={it.label}
                maxLength={40}
                onChange={(e) => update(i, { label: e.target.value })}
                aria-label={`Nombre de la evaluación ${i + 1}`}
                placeholder="Nombre (p. ej. Examen final)"
              />
              <div className="relative w-24 shrink-0">
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={it.weight ?? ""}
                  onChange={(e) => update(i, { weight: e.target.value === "" ? null : Math.max(0, Math.min(100, Number(e.target.value))) })}
                  aria-label={`Peso en porcentaje de ${it.label || "la evaluación"}`}
                  placeholder="Peso"
                  className="pr-6"
                />
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">%</span>
              </div>
              <Button type="button" variant="ghost" size="icon" onClick={() => setList(list.filter((_, j) => j !== i))} aria-label={`Quitar ${it.label}`}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {!list.length && <p className="py-3 text-center text-sm text-muted-foreground">Sin evaluaciones: la planilla sale con columnas en blanco.</p>}
          <Button type="button" variant="outline" size="sm" onClick={add} disabled={list.length >= 12}>
            <Plus className="mr-1 h-4 w-4" /> Agregar evaluación
          </Button>
          {withWeight > 0 && (
            <p className={`text-xs ${total === 100 && !mixed ? "text-muted-foreground" : "text-amber-600"}`}>
              Pesos: {total} %{total !== 100 ? " (lo usual es que sumen 100 %)" : ""}
              {mixed ? " · Pon peso a todas o a ninguna: si falta alguno, el promedio sale simple." : ""}
            </p>
          )}
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button
            type="button"
            disabled={saving || emptyLabel}
            onClick={() => onSave(list.map((i) => ({ key: i.key, label: i.label.trim(), weight: i.weight ?? null })))}
          >
            {saving && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
            Guardar evaluaciones
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function PlanillasPage() {
  const [, params] = useRoute<{ id: string }>("/planillas/:id");
  const rawId = params?.id || "";
  const isExample = rawId === "ejemplo";
  const courseId = /^\d+$/.test(rawId) ? Number(rawId) : null;
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const canUse = !!user && isTeacherOrAdminRole(user.role);

  const query = useCoursePlanillas(canUse && !isExample ? courseId : null);
  const [exampleData, setExampleData] = useState<PlanillaData | null>(() => (isExample ? buildExampleData() : null));
  useEffect(() => {
    if (isExample && !exampleData) setExampleData(buildExampleData());
  }, [isExample, exampleData]);
  const data = isExample ? exampleData : query.data ?? null;

  const [sheet, setSheet] = useState<SheetKey>(initialSheet);
  const [options, setOptions] = useState<SheetOptions>(DEFAULT_OPTIONS);
  // ?imprimir=todas deja listas todas las hojas para imprimir (o sacar el PDF completo).
  const [printAll, setPrintAll] = useState(() => {
    try {
      return new URLSearchParams(window.location.search).get("imprimir") === "todas";
    } catch {
      return false;
    }
  });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<GradeDraft>({});
  const [itemsOpen, setItemsOpen] = useState(false);
  const [attendanceSession, setAttendanceSession] = useState<PlanillaSession | null>(null);
  const saveGrades = useSaveCourseGrades(courseId ?? 0);

  const setOpt = <K extends keyof SheetOptions>(key: K, value: SheetOptions[K]) => setOptions((o) => ({ ...o, [key]: value }));

  // Lo que se ve y se imprime: con las notas que se están escribiendo.
  const shown = useMemo<PlanillaData | null>(() => {
    if (!data || !editing) return data;
    return {
      ...data,
      students: data.students.map((s) => {
        const d = draft[s.enrollmentId];
        return d ? { ...s, scores: d.scores, grade: d.grade, observations: d.observations } : s;
      }),
    };
  }, [data, editing, draft]);

  useEffect(() => {
    if (data) document.title = `Planillas · ${data.course.title}`;
  }, [data]);

  const selectSheet = (key: SheetKey) => {
    setSheet(key);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("hoja", key);
      window.history.replaceState(window.history.state, "", url.toString());
    } catch {
      /* no pasa nada */
    }
  };

  if (authLoading || (!isExample && canUse && courseId && query.isLoading)) {
    return (
      <Gate>
        <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" aria-label="Cargando" />
      </Gate>
    );
  }
  if (!user) {
    return (
      <Gate>
        <h1 className="mb-2 text-2xl font-bold">Planillas del curso</h1>
        <p className="mb-6 text-muted-foreground">Inicia sesión con tu cuenta de maestro o de la administración para ver las planillas.</p>
        <Button asChild><Link href="/login">Iniciar sesión</Link></Button>
      </Gate>
    );
  }
  if (!canUse) {
    return (
      <Gate>
        <h1 className="mb-2 text-2xl font-bold">Solo para maestros</h1>
        <p className="text-muted-foreground">Las planillas de los cursos son para los maestros y la administración del ministerio.</p>
      </Gate>
    );
  }
  if (!isExample && !courseId) {
    return (
      <Gate>
        <h1 className="mb-2 text-2xl font-bold">Curso no encontrado</h1>
        <p className="mb-6 text-muted-foreground">Abre las planillas desde el panel del maestro o mira el curso de ejemplo.</p>
        <Button asChild variant="outline"><Link href="/planillas/ejemplo">Ver el ejemplo</Link></Button>
      </Gate>
    );
  }
  if (!isExample && query.error) {
    return (
      <Gate>
        <h1 className="mb-2 text-2xl font-bold">No se pudieron abrir las planillas</h1>
        <p className="mb-6 text-muted-foreground">{query.error.message}</p>
        <Button asChild variant="outline"><Link href="/maestro">Volver al panel del maestro</Link></Button>
      </Gate>
    );
  }
  if (!data || !shown) return null;

  const roster = rosterFor(data, options.includePending);
  const sheetInfo = SHEETS.find((s) => s.key === sheet) ?? SHEETS[0];

  const doPrint = (all: boolean) => {
    const previousTitle = document.title;
    // Chrome usa el título como nombre del PDF.
    document.title = all ? `Planillas - ${data.course.title}` : `${sheetInfo.title} - ${data.course.title}`;
    flushSync(() => setPrintAll(all));
    const reset = () => {
      setPrintAll(false);
      document.title = previousTitle;
    };
    window.addEventListener("afterprint", reset, { once: true });
    window.print();
  };

  const handleCsv = () => {
    downloadCsv(`${sheet}-${slugify(data.course.title)}${isExample ? "-ejemplo" : ""}.csv`, sheetRows(sheet, shown, options));
  };

  const startEditing = () => {
    const next: GradeDraft = {};
    for (const s of data.students) next[s.enrollmentId] = { scores: { ...s.scores }, grade: s.grade || "", observations: s.observations || "" };
    setDraft(next);
    setEditing(true);
  };

  const onDraft = (enrollmentId: number, field: "grade" | "observations" | { score: string }, value: string) => {
    setDraft((d) => {
      const cur = d[enrollmentId];
      if (!cur) return d;
      if (typeof field === "object") return { ...d, [enrollmentId]: { ...cur, scores: { ...cur.scores, [field.score]: value } } };
      return { ...d, [enrollmentId]: { ...cur, [field]: value } };
    });
  };

  const saveDraft = () => {
    const rows: GradeRowInput[] = [];
    for (const s of data.students) {
      const d = draft[s.enrollmentId];
      if (!d) continue;
      const row: GradeRowInput = { enrollmentId: s.enrollmentId };
      if (normalizeScores(d.scores) !== normalizeScores(s.scores)) row.scores = d.scores;
      if ((d.grade.trim() || null) !== (s.grade || null)) row.grade = d.grade.trim() || null;
      if ((d.observations.trim() || null) !== (s.observations || null)) row.observations = d.observations.trim() || null;
      if (Object.keys(row).length > 1) rows.push(row);
    }
    if (!rows.length) {
      setEditing(false);
      toast({ title: "No había cambios en las notas" });
      return;
    }
    if (isExample) {
      setExampleData((prev) =>
        prev && {
          ...prev,
          students: prev.students.map((s) => {
            const r = rows.find((x) => x.enrollmentId === s.enrollmentId);
            if (!r) return s;
            return {
              ...s,
              scores: r.scores ? Object.fromEntries(Object.entries(r.scores).filter(([, v]) => v.trim())) : s.scores,
              grade: r.grade !== undefined ? r.grade : s.grade,
              observations: r.observations !== undefined ? r.observations : s.observations,
            };
          }),
        },
      );
      setEditing(false);
      toast({ title: "Notas cambiadas en el ejemplo", description: "Es un curso de ejemplo: no se guarda en la web." });
      return;
    }
    saveGrades.mutate(
      { rows },
      {
        onSuccess: (r) => {
          setEditing(false);
          toast({ title: "Notas guardadas", description: `${r.saved} alumno(s) actualizados.` });
        },
      },
    );
  };

  const saveItems = (items: GradeItem[]) => {
    if (isExample) {
      setExampleData((prev) => prev && { ...prev, course: { ...prev.course, gradeItems: items } });
      setItemsOpen(false);
      toast({ title: "Evaluaciones cambiadas en el ejemplo", description: "Es un curso de ejemplo: no se guarda en la web." });
      return;
    }
    saveGrades.mutate(
      { items },
      {
        onSuccess: () => {
          setItemsOpen(false);
          toast({ title: "Evaluaciones guardadas" });
        },
      },
    );
  };

  const openAttendance = (value: string) => {
    const session = data.sessions.find((s) => String(s.id) === value) || null;
    if (!session) return;
    if (isExample) {
      toast({ title: "En el ejemplo no se pasa asistencia", description: "Abre las planillas de un curso tuyo para pasarla de verdad." });
      return;
    }
    setAttendanceSession(session);
  };

  const goBack = () => {
    if (window.history.length > 1) window.history.back();
    else setLocation(isAdminRole(user.role) ? "/reportes" : "/maestro");
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-6xl px-4 py-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Button variant="ghost" size="sm" onClick={goBack} data-testid="button-planillas-back">
            <ArrowLeft className="mr-1 h-4 w-4" /> Volver
          </Button>
          {isExample && <Badge variant="secondary">Ejemplo con datos ficticios</Badge>}
        </div>

        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-medium text-primary">Planillas del curso</p>
            <h1 className="text-2xl font-bold leading-tight" data-testid="text-planillas-course">{data.course.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {roster.length} alumno(s) en la lista · {data.sessions.length} clase(s)
              {data.teacher ? ` · Maestro(a): ${data.teacher.name}` : ""} · Datos al {fmtDate(data.generatedAt)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => doPrint(false)} data-testid="button-print-sheet">
              <Printer className="mr-1 h-4 w-4" /> Imprimir o guardar PDF
            </Button>
            <Button variant="outline" onClick={() => doPrint(true)} data-testid="button-print-all">
              <Printer className="mr-1 h-4 w-4" /> Imprimir todas
            </Button>
            <Button variant="outline" onClick={handleCsv} disabled={sheet === "ficha"} data-testid="button-download-csv">
              <FileSpreadsheet className="mr-1 h-4 w-4" /> Descargar Excel
            </Button>
          </div>
        </div>

        <div role="tablist" aria-label="Planillas" className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {SHEETS.map((s) => {
            const Icon = SHEET_ICONS[s.key];
            const active = sheet === s.key;
            return (
              <Button
                key={s.key}
                role="tab"
                aria-selected={active}
                size="sm"
                variant={active ? "default" : "outline"}
                className="shrink-0"
                onClick={() => selectSheet(s.key)}
                data-testid={`tab-planilla-${s.key}`}
              >
                <Icon className="mr-1 h-4 w-4" /> {s.label}
              </Button>
            );
          })}
        </div>

        <div className="mb-5 rounded-lg border bg-card p-3 text-sm">
          <p className="mb-3 flex items-start gap-2 text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0" /> {SHEET_HELP[sheet]}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {PENDING_SHEETS.includes(sheet) && (
              <Toggle id="op-pendientes" label="Incluir solicitudes por aprobar" checked={options.includePending} onChange={(v) => setOpt("includePending", v)} />
            )}
            {sheet === "inscritos" && (
              <Toggle id="op-contacto" label="Mostrar teléfono y correo" checked={options.showContact} onChange={(v) => setOpt("showContact", v)} />
            )}
            {(sheet === "asistencia" || sheet === "notas") && (
              <Toggle id="op-blanco" label="En blanco (para llenar a mano)" checked={options.blank} onChange={(v) => setOpt("blank", v)} />
            )}
            {sheet === "asistencia" && (
              <>
                <div className="flex items-center gap-2">
                  <Label htmlFor="op-extra" className="font-normal">Columnas extra</Label>
                  <Select value={String(options.extraColumns)} onValueChange={(v) => setOpt("extraColumns", Number(v))}>
                    <SelectTrigger id="op-extra" className="h-8 w-20"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[0, 2, 4, 6, 8, 10, 12].map((n) => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                {data.sessions.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Label htmlFor="op-pasar" className="font-normal">Pasar asistencia de</Label>
                    <Select value="" onValueChange={openAttendance}>
                      <SelectTrigger id="op-pasar" className="h-8 w-56" data-testid="select-pass-attendance">
                        <SelectValue placeholder="Elige la clase…" />
                      </SelectTrigger>
                      <SelectContent>
                        {data.sessions.map((s, i) => (
                          <SelectItem key={s.id} value={String(s.id)}>{`${i + 1}. ${fmtDate(s.sessionDate)} · ${s.title}`}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </>
            )}
            {sheet === "notas" && (
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => setItemsOpen(true)} disabled={editing} data-testid="button-grade-items">
                  <Settings2 className="mr-1 h-4 w-4" /> Evaluaciones ({data.course.gradeItems.length})
                </Button>
                {editing ? (
                  <>
                    <Button size="sm" onClick={saveDraft} disabled={saveGrades.isPending} data-testid="button-save-grades">
                      {saveGrades.isPending ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Save className="mr-1 h-4 w-4" />}
                      Guardar notas
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>
                      <X className="mr-1 h-4 w-4" /> Cancelar
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline" onClick={startEditing} disabled={!roster.length} data-testid="button-edit-grades">
                    <Pencil className="mr-1 h-4 w-4" /> Escribir notas
                  </Button>
                )}
              </div>
            )}
            {sheet === "firmas" && (
              <>
                <div className="flex items-center gap-2">
                  <Label htmlFor="op-clase" className="font-normal">Clase</Label>
                  <Select
                    value={options.firmasSessionId === null ? "blanco" : String(options.firmasSessionId)}
                    onValueChange={(v) => setOpt("firmasSessionId", v === "blanco" ? null : Number(v))}
                  >
                    <SelectTrigger id="op-clase" className="h-8 w-60"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blanco">Fecha y tema en blanco</SelectItem>
                      {data.sessions.map((s, i) => (
                        <SelectItem key={s.id} value={String(s.id)}>{`${i + 1}. ${fmtDate(s.sessionDate)} · ${s.title}`}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="op-visitas" className="font-normal">Renglones para visitantes</Label>
                  <Select value={String(options.firmasExtraRows)} onValueChange={(v) => setOpt("firmasExtraRows", Number(v))}>
                    <SelectTrigger id="op-visitas" className="h-8 w-20"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[0, 4, 6, 10, 15].map((n) => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
        </div>

        {isExample && (
          <div className="mb-5 rounded-lg border border-orange-300 bg-orange-50 p-3 text-sm text-orange-950 dark:border-orange-800 dark:bg-orange-950/40 dark:text-orange-100">
            Este es un <b>curso de ejemplo con personas inventadas</b>, para que veas cómo quedan las planillas. Las de un curso real se
            abren desde el <b>Panel del maestro</b> (botón «Planillas» del curso) o desde <b>Reportes → Cursos</b>, y se llenan solas con
            los inscritos, la asistencia y las notas de ese curso.
          </div>
        )}

        <div className="-mx-4 overflow-x-auto px-4 pb-2" data-testid="planilla-preview">
          <SheetView
            sheet={sheet}
            data={shown}
            options={options}
            editing={editing && sheet === "notas"}
            draft={draft}
            onDraft={onDraft}
          />
        </div>
        <p className="pb-6 text-center text-xs text-muted-foreground">
          Consejo: en la ventana de imprimir elige «Guardar como PDF» para quedarte con el archivo o mandarlo por WhatsApp.
        </p>
      </div>

      <PrintPortal>
        {printAll ? (
          <AllSheets data={shown} options={options} keys={SHEETS.map((s) => s.key)} />
        ) : (
          <SheetView sheet={sheet} data={shown} options={options} />
        )}
      </PrintPortal>

      {!isExample && courseId && (
        <AttendanceDialog
          courseId={courseId}
          session={attendanceSession}
          open={!!attendanceSession}
          onOpenChange={(open) => {
            if (!open) setAttendanceSession(null);
          }}
        />
      )}
      <EvaluacionesDialog
        open={itemsOpen}
        onOpenChange={setItemsOpen}
        items={data.course.gradeItems}
        saving={saveGrades.isPending}
        onSave={saveItems}
      />
    </Layout>
  );
}
