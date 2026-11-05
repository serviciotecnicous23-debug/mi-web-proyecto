import { useEffect, useRef, useState } from "react";
import { localDate, minReadingSeconds, type ReadingRecordResult } from "@shared/club";
import { useRecordReading, userTimeZone } from "@/hooks/use-club";

export type ReadingTrackerState = "leyendo" | "registrando" | "registrada" | "error";

/**
 * Lectura comprobada: un capítulo cuenta para el club cuando el lector llega al
 * final y estuvo en él un tiempo mínimo proporcional a su largo (solo con la
 * página visible). Así nadie lo marca a mano ni basta con abrir y cerrar.
 */
export function useReadingTracker({
  enabled,
  book,
  chapter,
  version,
  verseCount,
}: {
  enabled: boolean;
  book: string;
  chapter: number;
  version: string;
  verseCount: number;
}) {
  const key = `${book}|${chapter}|${version}`;
  const [seconds, setSeconds] = useState(0);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [state, setState] = useState<ReadingTrackerState>("leyendo");
  const [result, setResult] = useState<ReadingRecordResult | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const sentFor = useRef<string | null>(null);
  const record = useRecordReading();
  const needed = minReadingSeconds(verseCount);

  useEffect(() => {
    setSeconds(0);
    setReachedEnd(false);
    setState("leyendo");
    setResult(null);
  }, [key]);

  useEffect(() => {
    if (!enabled) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setSeconds((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [enabled, key]);

  useEffect(() => {
    const target = endRef.current;
    if (!enabled || !target) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setReachedEnd(true);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [enabled, key, verseCount]);

  const send = () => {
    const sentKey = `${key}|${localDate(userTimeZone())}`;
    if (sentFor.current === sentKey) return;
    sentFor.current = sentKey;
    setState("registrando");
    record.mutate(
      { book, chapter, version, seconds },
      {
        onSuccess: (r) => {
          setResult(r);
          setState("registrada");
        },
        onError: () => {
          sentFor.current = null;
          setState("error");
        },
      },
    );
  };

  useEffect(() => {
    if (enabled && reachedEnd && seconds >= needed && state === "leyendo") send();
    // `send` usa los valores de este render; no hace falta como dependencia.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, reachedEnd, seconds, needed, state]);

  return {
    endRef,
    seconds,
    needed,
    reachedEnd,
    state,
    result,
    retry: () => {
      setState("leyendo");
    },
  };
}
