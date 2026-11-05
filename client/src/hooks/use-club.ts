import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { api } from "@shared/routes";
import type { ClubSummary, ReadingRecordResult } from "@shared/club";

const SUMMARY_KEY = "/api/club/summary";

/** Zona horaria del lector: el servidor la usa para saber qué es "hoy" para él. */
export function userTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Chicago";
  } catch {
    return "America/Chicago";
  }
}

export function useClubSummary(enabled = true) {
  const tz = userTimeZone();
  return useQuery<ClubSummary>({
    queryKey: [SUMMARY_KEY, tz],
    queryFn: async () => {
      const res = await apiRequest("GET", `${SUMMARY_KEY}?tz=${encodeURIComponent(tz)}`);
      return res.json();
    },
    enabled,
    refetchOnWindowFocus: true,
  });
}

function useInvalidateClub() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: [SUMMARY_KEY] });
    queryClient.invalidateQueries({ queryKey: ["/api/notifications"] });
    queryClient.invalidateQueries({ queryKey: ["/api/notifications/unread-count"] });
  };
}

function useAnnounceBadges() {
  const { toast } = useToast();
  return (badges: { label: string; icon: string }[]) => {
    for (const badge of badges) {
      toast({ title: `${badge.icon} ¡Nueva insignia!`, description: badge.label });
    }
  };
}

/** Lo llama la Biblia de la web cuando el capítulo se leyó de verdad (ver useReadingTracker). */
export function useRecordReading() {
  const queryClient = useQueryClient();
  const invalidate = useInvalidateClub();
  const announce = useAnnounceBadges();
  return useMutation({
    mutationFn: async (data: { book: string; chapter: number; version: string; seconds: number }): Promise<ReadingRecordResult> => {
      const res = await apiRequest("POST", "/api/bible/reading", { ...data, tz: userTimeZone() });
      return res.json();
    },
    onSuccess: (result) => {
      invalidate();
      if (result.planItemsCompleted > 0) {
        queryClient.invalidateQueries({ queryKey: [api.readingPlans.list.path] });
        queryClient.invalidateQueries({ queryKey: [api.readingPlans.get.path] });
      }
      announce(result.newBadges);
    },
  });
}

export function useJoinChallenge() {
  const invalidate = useInvalidateClub();
  return useMutation({
    mutationFn: async ({ id, join }: { id: number; join: boolean }) => {
      await apiRequest(join ? "POST" : "DELETE", `/api/club/challenges/${id}/join`);
    },
    onSuccess: invalidate,
  });
}

export function useCreateChallenge() {
  const invalidate = useInvalidateClub();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      description?: string;
      presetId?: string;
      books?: string[];
      chaptersPerDay?: number;
      startDate: string;
      notifyAll: boolean;
    }) => {
      const res = await apiRequest("POST", "/api/club/challenges", { ...data, tz: userTimeZone() });
      return res.json();
    },
    onSuccess: invalidate,
  });
}

export function useEndChallenge() {
  const invalidate = useInvalidateClub();
  return useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("PATCH", `/api/club/challenges/${id}`, { isActive: false });
    },
    onSuccess: invalidate,
  });
}

export function useCheckMemoryVerse() {
  const invalidate = useInvalidateClub();
  const announce = useAnnounceBadges();
  return useMutation({
    mutationFn: async (answers: string[]): Promise<{ correct: boolean; wrong: number[]; newBadges: { label: string; icon: string }[] }> => {
      const res = await apiRequest("POST", "/api/club/memory-verse", { answers, tz: userTimeZone() });
      return res.json();
    },
    onSuccess: (result) => {
      if (result.correct) {
        invalidate();
        announce(result.newBadges);
      }
    },
  });
}
