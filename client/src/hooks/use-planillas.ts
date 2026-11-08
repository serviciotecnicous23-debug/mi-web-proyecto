import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { AttendanceStatus, GradeItem, PlanillaData } from "@/components/planillas/model";
import { useToast } from "@/hooks/use-toast";

class PlanillaError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function jsonFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const fallback =
      res.status === 401 ? "Tu sesión terminó: vuelve a iniciar sesión."
      : res.status === 403 ? "Solo el maestro de este curso o la administración pueden ver sus planillas."
      : res.status === 404 ? "No encontramos ese curso."
      : "No se pudo completar. Intenta de nuevo.";
    throw new PlanillaError(body?.message || fallback, res.status);
  }
  return res.json() as Promise<T>;
}

export const planillasKey = (courseId: number) => [api.coursePlanillas.get.path, courseId] as const;

export function useCoursePlanillas(courseId: number | null) {
  return useQuery<PlanillaData, PlanillaError>({
    queryKey: planillasKey(courseId ?? 0),
    queryFn: () => jsonFetch<PlanillaData>(buildUrl(api.coursePlanillas.get.path, { courseId: courseId as number })),
    enabled: !!courseId,
    retry: (count, err) => (err?.status ?? 500) >= 500 && count < 2,
  });
}

export type GradeRowInput = {
  enrollmentId: number;
  scores?: Record<string, string>;
  grade?: string | null;
  observations?: string | null;
};

export function useSaveCourseGrades(courseId: number) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: (body: { items?: GradeItem[]; rows?: GradeRowInput[] }) =>
      jsonFetch<{ ok: boolean; saved: number }>(buildUrl(api.coursePlanillas.saveGrades.path, { courseId }), {
        method: "PUT",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: planillasKey(courseId) });
      queryClient.invalidateQueries({ queryKey: [api.enrollments.listByCourse.path, courseId] });
    },
    onError: (error: Error) => toast({ title: "No se guardaron las notas", description: error.message, variant: "destructive" }),
  });
}

export function useSaveSessionAttendance(courseId: number) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: ({ sessionId, records }: { sessionId: number; records: { userId: number; status: AttendanceStatus | null }[] }) =>
      jsonFetch<unknown[]>(buildUrl(api.sessionAttendance.bulk.path, { sessionId }), {
        method: "POST",
        body: JSON.stringify({ records }),
      }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [api.sessionAttendance.list.path, variables.sessionId] });
      queryClient.invalidateQueries({ queryKey: planillasKey(courseId) });
      toast({ title: "Asistencia guardada" });
    },
    onError: (error: Error) => toast({ title: "No se guardó la asistencia", description: error.message, variant: "destructive" }),
  });
}
