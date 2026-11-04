import { useMemo, useRef, useState } from "react";
import { ExternalLink, FolderOpen, Loader2, Music, Radio, Trash2, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAdminRadioLibrary, useDeleteRadioTrack, useUploadRadioTracks } from "@/hooks/use-radio";
import type { RadioCategoryId, RadioLibraryTrack } from "@shared/radio";

const DEFAULT_CATEGORY: RadioCategoryId = "adoracion";

function formatBytes(bytes: number) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

export function RadioLibraryAdmin() {
  const { data, isLoading } = useAdminRadioLibrary();
  const uploadTracks = useUploadRadioTracks();
  const deleteTrack = useDeleteRadioTrack();
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [category, setCategory] = useState<RadioCategoryId>(DEFAULT_CATEGORY);

  const tracksByCategory = useMemo(() => {
    const grouped = new Map<RadioCategoryId, RadioLibraryTrack[]>();
    for (const track of data?.tracks || []) {
      const current = grouped.get(track.category) || [];
      grouped.set(track.category, [...current, track]);
    }
    return grouped;
  }, [data?.tracks]);

  const currentCategory = data?.categories.find((item) => item.id === category);

  const handleUpload = async (files: FileList | null) => {
    const selected = Array.from(files || []);
    if (!selected.length) return;

    try {
      await uploadTracks.mutateAsync({ category, files: selected });
      toast({
        title: "Audios subidos",
        description: `${selected.length} archivo(s) agregados a ${currentCategory?.name || category}.`,
      });
    } catch (error) {
      toast({
        title: "No se pudo subir",
        description: error instanceof Error ? error.message : "Revisa el archivo e intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleDelete = async (track: RadioLibraryTrack) => {
    try {
      await deleteTrack.mutateAsync({ category: track.category, fileName: track.fileName });
      toast({ title: "Audio eliminado", description: track.title });
    } catch (error) {
      toast({
        title: "No se pudo eliminar",
        description: error instanceof Error ? error.message : "Intenta de nuevo.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="h-5 w-5" />
            Biblioteca de Radio
          </CardTitle>
          <CardDescription>
            Sube música, prédicas, palabras, devocionales, testimonios y jingles. La página publica de radio reproduce esta biblioteca cuando no configuras una URL externa.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 md:grid-cols-[minmax(220px,320px)_1fr] md:items-end">
            <div className="space-y-2">
              <Label>Categoría</Label>
              <Select value={category} onValueChange={(value) => setCategory(value as RadioCategoryId)}>
                <SelectTrigger data-testid="select-radio-upload-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(data?.categories || []).map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <input
                ref={inputRef}
                type="file"
                multiple
                accept="audio/*,.mp3,.m4a,.aac,.wav,.ogg,.oga,.flac"
                className="hidden"
                onChange={(event) => void handleUpload(event.target.files)}
                data-testid="input-radio-audio-files"
              />
              <Button
                className="gap-2"
                onClick={() => inputRef.current?.click()}
                disabled={uploadTracks.isPending}
                data-testid="button-radio-upload"
              >
                {uploadTracks.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                Subir audio
              </Button>
              <div className="text-sm text-muted-foreground">
                Max {data?.uploadMaxMb || 250} MB por archivo. Formatos: MP3, M4A, AAC, WAV, OGG, FLAC.
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Total de audios</p>
              <p className="mt-1 text-2xl font-bold">{data?.trackCount || 0}</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Categoría activa</p>
              <p className="mt-1 font-semibold">{currentCategory?.name || "Adoracion"}</p>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Senal publica</p>
              <p className="mt-1 font-semibold">{data?.trackCount ? "Reproduce tus audios" : "Usa audio de prueba"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {(data?.categories || []).map((item) => {
        const tracks = tracksByCategory.get(item.id) || [];
        return (
          <Card key={item.id}>
            <CardHeader className="pb-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FolderOpen className="h-4 w-4 text-primary" />
                    {item.name}
                    <Badge variant="secondary">{tracks.length}</Badge>
                  </CardTitle>
                  <CardDescription>{item.role}</CardDescription>
                </div>
                <Badge variant="outline">{item.rotationTarget}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {!tracks.length ? (
                <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                  Todavía no hay audios en esta carpeta.
                </div>
              ) : (
                <div className="space-y-2">
                  {tracks.map((track) => (
                    <div key={track.id} className="flex flex-col gap-3 rounded-lg border bg-background p-3 md:flex-row md:items-center md:justify-between">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Music className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium">{track.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatBytes(track.size)} · {new Date(track.createdAt).toLocaleDateString("es-ES")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <audio controls preload="none" src={track.url} className="h-9 w-48 max-w-full" />
                        <Button size="icon" variant="outline" onClick={() => window.open(track.url, "_blank")}>
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => void handleDelete(track)}
                          disabled={deleteTrack.isPending}
                          data-testid={`button-delete-radio-${track.category}-${track.fileName}`}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
