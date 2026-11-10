import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Flag, Loader2, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MOTIVOS_DE_DENUNCIA, NOMBRE_DEL_TIPO, type MotivoDeDenuncia, type TipoDenunciable } from "@shared/reports";

type Denuncia = {
  id: number;
  contentType: TipoDenunciable;
  contentId: number;
  reason: MotivoDeDenuncia;
  details: string | null;
  status: "pendiente" | "revisada" | "descartada";
  createdAt: string;
  reviewedAt: string | null;
  reporterName: string | null;
  content: string | null;
  authorId: number | null;
  authorName: string | null;
  postId: number | null;
  /** En los mensajes de la charla del barrio: el personaje que lo escribió. */
  gameCharacterId?: number | null;
};

type Grupo = { clave: string; principal: Denuncia; denuncias: Denuncia[]; pendiente: boolean };

const CLAVE_LISTA = ["/api/admin/reports"];

const RUTA_PARA_BORRAR: Record<TipoDenunciable, (id: number) => string> = {
  publicacion: (id) => `/api/posts/${id}`,
  comentario: (id) => `/api/post-comments/${id}`,
  oracion: (id) => `/api/prayer-requests/${id}`,
  // un jugador no se borra: se lo saca de la ciudad (puede seguir sirviendo en el templo)
  jugador: (id) => `/api/jerusalen/admin/jugador/${id}`,
  // un mensaje de la charla de un barrio se oculta para todos
  mensaje: (id) => `/api/jerusalen/barrio/chat/${id}`,
};

const DONDE_VERLO: Record<TipoDenunciable, (d: Denuncia) => string> = {
  publicacion: () => "/comunidad",
  comentario: () => "/comunidad",
  oracion: () => "/oracion",
  jugador: () => "/juegos/aprendiz-del-templo",
  mensaje: () => "/juegos/aprendiz-del-templo",
};

/** Agrupa las denuncias por contenido: pendientes primero. */
function agrupar(lista: Denuncia[]): Grupo[] {
  const mapa = new Map<string, Denuncia[]>();
  for (const d of lista) {
    const clave = `${d.contentType}:${d.contentId}`;
    mapa.set(clave, [...(mapa.get(clave) || []), d]);
  }
  return [...mapa.entries()]
    .map(([clave, denuncias]) => ({
      clave,
      denuncias,
      principal: denuncias[0],
      pendiente: denuncias.some((d) => d.status === "pendiente"),
    }))
    .sort((a, b) => Number(b.pendiente) - Number(a.pendiente));
}

export function usePendingReportsCount(enabled: boolean): number {
  const { data } = useQuery<Denuncia[]>({ queryKey: CLAVE_LISTA, enabled });
  return useMemo(() => agrupar(data || []).filter((g) => g.pendiente).length, [data]);
}

export function ReportsAdmin() {
  const { data, isLoading } = useQuery<Denuncia[]>({ queryKey: CLAVE_LISTA });
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [verResueltas, setVerResueltas] = useState(false);
  const grupos = useMemo(() => agrupar(data || []), [data]);
  const pendientes = grupos.filter((g) => g.pendiente);
  const resueltas = grupos.filter((g) => !g.pendiente);

  const resolver = useMutation({
    mutationFn: async ({ grupo, accion }: { grupo: Grupo; accion: "borrar" | "descartar" | "sacar" }) => {
      const d = grupo.principal;
      if ((accion === "borrar" || accion === "sacar") && d.content !== null) {
        const r = await fetch(RUTA_PARA_BORRAR[d.contentType](d.contentId), { method: "DELETE", credentials: "include" });
        if (!r.ok && r.status !== 404) throw new Error("No se pudo borrar el contenido.");
      }
      // el autor de un mensaje de la charla también puede quedar fuera de la ciudad (y de la charla)
      if (accion === "sacar" && d.gameCharacterId) {
        const r = await fetch(`/api/jerusalen/admin/jugador/${d.gameCharacterId}`, { method: "DELETE", credentials: "include" });
        if (!r.ok && r.status !== 404) throw new Error("No se pudo sacar al autor de la ciudad.");
      }
      const r = await fetch(`/api/admin/reports/${d.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: accion === "descartar" ? "descartada" : "revisada" }),
      });
      if (!r.ok) throw new Error("No se pudo cerrar la denuncia.");
    },
    onSuccess: (_d, { accion }) => {
      toast({ title: accion === "descartar" ? "Denuncia descartada" : "Listo: se aplicó la medida" });
      queryClient.invalidateQueries({ queryKey: CLAVE_LISTA });
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
    },
    onError: (err: Error) => toast({ title: "Algo falló", description: err.message, variant: "destructive" }),
  });

  const tarjeta = (g: Grupo) => {
    const d = g.principal;
    const motivos = [...new Set(g.denuncias.map((x) => MOTIVOS_DE_DENUNCIA[x.reason] || x.reason))];
    return (
      <Card key={g.clave} data-testid={`report-${g.clave}`} className={g.pendiente ? "border-destructive/30" : "opacity-80"}>
        <CardContent className="pt-4 space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Badge variant="outline">{NOMBRE_DEL_TIPO[d.contentType]}</Badge>
            <Badge variant={g.pendiente ? "destructive" : "secondary"}>
              {g.denuncias.length} {g.denuncias.length === 1 ? "denuncia" : "denuncias"}
            </Badge>
            {!g.pendiente && <Badge variant="secondary">{d.status === "revisada" ? "Revisada" : "Descartada"}</Badge>}
            <span className="text-muted-foreground">{new Date(d.createdAt).toLocaleString("es")}</span>
          </div>
          <div className="rounded-md bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground mb-1">Autor: <b className="text-foreground">{d.authorName || "—"}</b></p>
            {d.content !== null ? (
              <p className="text-sm whitespace-pre-wrap break-words">{d.content}</p>
            ) : (
              <p className="text-sm italic text-muted-foreground">El contenido ya no existe.</p>
            )}
          </div>
          <div className="text-sm">
            <p><span className="text-muted-foreground">Motivo:</span> {motivos.join(" · ")}</p>
            {g.denuncias.filter((x) => x.details).map((x) => (
              <p key={x.id} className="text-muted-foreground text-xs mt-1">“{x.details}” — {x.reporterName || "Miembro"}</p>
            ))}
          </div>
          {g.pendiente && (
            <div className="flex flex-wrap gap-2">
              {d.content !== null && (
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={resolver.isPending}
                  onClick={() => resolver.mutate({ grupo: g, accion: "borrar" })}
                  data-testid={`button-report-borrar-${g.clave}`}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> {d.contentType === "jugador" ? "Sacarlo de la ciudad" : d.contentType === "mensaje" ? "Borrar el mensaje" : "Eliminar el contenido"}
                </Button>
              )}
              {d.contentType === "mensaje" && d.gameCharacterId && (
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={resolver.isPending}
                  onClick={() => resolver.mutate({ grupo: g, accion: "sacar" })}
                  data-testid={`button-report-sacar-${g.clave}`}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Borrarlo y sacar al autor de la ciudad
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                disabled={resolver.isPending}
                onClick={() => resolver.mutate({ grupo: g, accion: "descartar" })}
                data-testid={`button-report-descartar-${g.clave}`}
              >
                <Check className="mr-2 h-4 w-4" /> {d.content !== null ? "Dejarlo (no infringe)" : "Cerrar"}
              </Button>
              <a href={DONDE_VERLO[d.contentType](d)} className="text-sm text-primary hover:underline self-center">Ver dónde está</a>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Flag className="h-5 w-5" /> Denuncias</CardTitle>
        <CardDescription>
          Lo que los miembros denunciaron en Comunidad, comentarios, el muro de oración, la ciudad del juego y la charla de los barrios. Revísalo pronto: las normas de la
          comunidad (y las tiendas de apps) piden responder a tiempo.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="p-12 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
        ) : pendientes.length === 0 ? (
          <p className="p-8 text-center text-muted-foreground" data-testid="reports-empty">No hay denuncias pendientes. 🙌</p>
        ) : (
          pendientes.map(tarjeta)
        )}
        {resueltas.length > 0 && (
          <div className="pt-2">
            <Button variant="ghost" size="sm" onClick={() => setVerResueltas((v) => !v)}>
              {verResueltas ? "Ocultar" : "Ver"} las resueltas ({resueltas.length})
            </Button>
            {verResueltas && <div className="space-y-3 mt-3">{resueltas.map(tarjeta)}</div>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
