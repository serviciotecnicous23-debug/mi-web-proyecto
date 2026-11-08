/**
 * Pasar asistencia de una clase: toda la lista en una pantalla, un toque por alumno
 * (Presente, Tardanza, Ausente, Justificado) y un solo "Guardar".
 */
import { useEffect, useMemo, useState } from "react";
import { Loader2, CheckCheck, Eraser } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCourseEnrollments, useSessionAttendance } from "@/hooks/use-users";
import { useSaveSessionAttendance } from "@/hooks/use-planillas";
import { ATT_LABEL, ATT_ORDER, ATT_SHORT, fmtLongDate, type AttendanceStatus } from "./model";

type SessionLike = { id: number; title: string; sessionDate: string | Date };

const TONE: Record<AttendanceStatus, string> = {
  presente: "bg-green-600 text-white border-green-600",
  tardanza: "bg-amber-500 text-white border-amber-500",
  ausente: "bg-red-600 text-white border-red-600",
  excusado: "bg-blue-600 text-white border-blue-600",
};

export function AttendanceDialog({
  courseId, session, open, onOpenChange,
}: {
  courseId: number;
  session: SessionLike | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const sessionId = session?.id ?? 0;
  const { data: enrollments, isLoading: loadingRoster } = useCourseEnrollments(open ? courseId : 0);
  const { data: attendance, isLoading: loadingMarks, isError: marksError } = useSessionAttendance(open ? sessionId : 0);
  const save = useSaveSessionAttendance(courseId);
  const [marks, setMarks] = useState<Record<number, AttendanceStatus | null>>({});
  const [loadedFor, setLoadedFor] = useState<number | null>(null);

  const students = useMemo(
    () =>
      ((enrollments as any[]) || [])
        .filter((e) => e.status === "aprobado" || e.status === "completado")
        .map((e) => ({ userId: e.userId as number, name: (e.user?.displayName || e.user?.username || "Alumno") as string }))
        .sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" })),
    [enrollments],
  );

  // Carga las marcas guardadas una vez por clase (sin pisar lo que el maestro va marcando).
  useEffect(() => {
    if (!open) {
      setLoadedFor(null);
      return;
    }
    if (loadedFor === sessionId || !attendance) return;
    const next: Record<number, AttendanceStatus | null> = {};
    for (const a of attendance as { userId: number; status: AttendanceStatus }[]) next[a.userId] = a.status;
    setMarks(next);
    setLoadedFor(sessionId);
  }, [open, attendance, sessionId, loadedFor]);

  const counts = useMemo(() => {
    const c: Record<AttendanceStatus | "sin", number> = { presente: 0, tardanza: 0, ausente: 0, excusado: 0, sin: 0 };
    for (const s of students) c[marks[s.userId] || "sin"]++;
    return c;
  }, [students, marks]);

  const setAll = (status: AttendanceStatus | null) => {
    const next: Record<number, AttendanceStatus | null> = {};
    for (const s of students) next[s.userId] = status;
    setMarks(next);
  };

  const handleSave = () => {
    if (!session) return;
    save.mutate(
      { sessionId: session.id, records: students.map((s) => ({ userId: s.userId, status: marks[s.userId] || null })) },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  const loading = loadingRoster || loadingMarks || (open && !marksError && loadedFor !== sessionId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Pasar asistencia</DialogTitle>
          <DialogDescription>
            {session ? `${session.title} · ${fmtLongDate(session.sessionDate)}` : ""}
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-7 w-7 animate-spin text-primary" />
          </div>
        ) : marksError ? (
          <p className="py-8 text-center text-sm text-destructive">
            No se pudo cargar la asistencia de esta clase. Solo el maestro del curso o la administración pueden pasarla.
          </p>
        ) : !students.length ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Todavía no hay alumnos aprobados en este curso. Aprueba las inscripciones en la pestaña Estudiantes.
          </p>
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              <Button type="button" size="sm" variant="outline" onClick={() => setAll("presente")} data-testid="button-attendance-all-present">
                <CheckCheck className="mr-1 h-4 w-4" /> Todos presentes
              </Button>
              <Button type="button" size="sm" variant="ghost" onClick={() => setAll(null)}>
                <Eraser className="mr-1 h-4 w-4" /> Limpiar
              </Button>
            </div>
            <ul className="-mx-1 flex-1 divide-y overflow-y-auto pr-1" aria-label="Lista de alumnos">
              {students.map((s, i) => (
                <li key={s.userId} className="flex items-center gap-2 px-1 py-2" data-testid={`attendance-row-${s.userId}`}>
                  <span className="w-6 shrink-0 text-right text-xs text-muted-foreground">{i + 1}</span>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">{s.name}</span>
                  <div className="flex shrink-0 gap-1" role="radiogroup" aria-label={`Asistencia de ${s.name}`}>
                    {ATT_ORDER.map((status) => {
                      const active = marks[s.userId] === status;
                      return (
                        <button
                          key={status}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          title={ATT_LABEL[status]}
                          aria-label={ATT_LABEL[status]}
                          onClick={() => setMarks((m) => ({ ...m, [s.userId]: active ? null : status }))}
                          className={`h-8 w-8 rounded-md border text-xs font-bold transition-colors ${
                            active ? TONE[status] : "border-border bg-background text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {ATT_SHORT[status]}
                        </button>
                      );
                    })}
                  </div>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">
              Presentes {counts.presente} · Tardanzas {counts.tardanza} · Ausentes {counts.ausente} · Justificados {counts.excusado}
              {counts.sin ? ` · Sin marcar ${counts.sin} (cuentan como ausentes)` : ""}
            </p>
          </>
        )}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleSave} disabled={save.isPending || loading || marksError || !students.length} data-testid="button-save-attendance">
            {save.isPending && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
            Guardar asistencia
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
