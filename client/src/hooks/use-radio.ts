import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RUTAS, conParametros as buildUrl } from "@shared/rutas-livianas";
import type { RadioCategory, RadioCategoryId, RadioLibraryTrack, RadioStationPayload } from "@shared/radio";

type RadioLibraryPayload = {
  categories: RadioCategory[];
  tracks: RadioLibraryTrack[];
  trackCount: number;
  uploadMaxMb: number;
};

export function useRadioStation() {
  return useQuery<RadioStationPayload>({
    queryKey: [RUTAS.radio.station],
    queryFn: async () => {
      const res = await fetch(RUTAS.radio.station, { credentials: "include" });
      if (!res.ok) throw new Error("Error al cargar la emisora");
      return res.json();
    },
    refetchInterval: 15000,
    staleTime: 10000,
  });
}

export function useAdminRadioLibrary() {
  return useQuery<RadioLibraryPayload>({
    queryKey: [RUTAS.admin.listRadioLibrary],
    queryFn: async () => {
      const res = await fetch(RUTAS.admin.listRadioLibrary, { credentials: "include" });
      if (!res.ok) throw new Error("Error al cargar la biblioteca de radio");
      return res.json();
    },
  });
}

export function useUploadRadioTracks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ category, files }: { category: RadioCategoryId; files: File[] }) => {
      const form = new FormData();
      files.forEach((file) => form.append("files", file));
      const url = buildUrl(RUTAS.admin.uploadRadioTrack, { category });
      const res = await fetch(url, {
        method: "POST",
        body: form,
        credentials: "include",
      });
      if (!res.ok) {
        const message = await res.text();
        throw new Error(message || "Error al subir audio");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RUTAS.admin.listRadioLibrary] });
      queryClient.invalidateQueries({ queryKey: [RUTAS.radio.station] });
    },
  });
}

export function useDeleteRadioTrack() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ category, fileName }: { category: RadioCategoryId; fileName: string }) => {
      const url = buildUrl(RUTAS.admin.deleteRadioTrack, {
        category,
        fileName: encodeURIComponent(fileName),
      });
      const res = await fetch(url, { method: "DELETE", credentials: "include" });
      if (!res.ok) {
        const message = await res.text();
        throw new Error(message || "Error al eliminar audio");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RUTAS.admin.listRadioLibrary] });
      queryClient.invalidateQueries({ queryKey: [RUTAS.radio.station] });
    },
  });
}
