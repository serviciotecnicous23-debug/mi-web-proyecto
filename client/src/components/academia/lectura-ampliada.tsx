// La lectura ampliada de una materia de los Niveles 4 y 5 (revisión del 16-nov, docs/academia-auditoria.md): qué leer,
// cuánto pide y tres preguntas guía para un reporte de 150 a 300 palabras. El botón abre en el cuaderno la nota del
// reporte, ligada a la materia: la crea la primera vez, con las preguntas, y después abre la misma.
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { BookMarked, Clock, ExternalLink, Loader2, NotebookPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LecturaAmpliada } from "@shared/academia";
import { LIMITES, bloque, type CuadernoLista } from "@shared/cuaderno";
import { ErrorCuaderno, crearNota, pedir } from "@/components/cuaderno/api";
import { loginUrl } from "@/lib/login-redirect";

const PREFIJO = "Reporte de lectura: ";

/** El título de la nota: entero si cabe (hasta 160 letras); si no, cortado en el último espacio, con «…». */
export function tituloDelReporte(lectura: string): string {
  const t = `${PREFIJO}${lectura}`;
  if (t.length <= LIMITES.titulo) return t;
  const corte = t.slice(0, LIMITES.titulo - 1);
  const espacio = corte.lastIndexOf(" ");
  return `${(espacio > PREFIJO.length ? corte.slice(0, espacio) : corte).replace(/[\s,.;:–-]+$/, "")}…`;
}

export function LecturaAmpliadaCard({ a, materiaId, conSesion }: { a: LecturaAmpliada; materiaId: string; conSesion: boolean }) {
  const [, navegar] = useLocation();
  const qc = useQueryClient();
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const escribir = async () => {
    if (ocupado) return;
    setOcupado(true);
    setError(null);
    try {
      const titulo = tituloDelReporte(a.lectura);
      // si ya lo empezó, se abre el mismo: la nota de esta materia con el título del reporte
      const lista = await pedir<CuadernoLista>("GET", `/api/cuaderno?materia=${encodeURIComponent(materiaId)}`);
      const ya = lista.notas.find((n) => n.titulo === titulo);
      if (ya) {
        navegar(`/academia/cuaderno?nota=${ya.id}`);
        return;
      }
      const nota = await crearNota({
        titulo,
        materiaId,
        bloques: [
          bloque("aviso", `Lectura ampliada: ${a.lectura}. Fuente: ${a.fuente}. Escribe un reporte de 150 a 300 palabras con estas preguntas como guía.`),
          ...a.reporte.flatMap((p) => [bloque("subtitulo", p), bloque("texto", "")]),
        ],
      });
      // como al crear una nota en el cuaderno: la nota queda a mano y la lista se vuelve a pedir
      qc.setQueryData(["cuaderno", "nota", nota.id], nota);
      await qc.invalidateQueries({ queryKey: ["cuaderno", "lista"] });
      navegar(`/academia/cuaderno?nota=${nota.id}`);
    } catch (e) {
      setError(e instanceof ErrorCuaderno ? e.message : "No se pudo abrir el cuaderno. Revisa tu conexión e inténtalo otra vez.");
      setOcupado(false);
    }
  };
  return (
    <section className="glass-card p-5 md:p-6 border border-orange-500/30" data-testid="lectura-ampliada">
      <p className="data-label text-orange-600 dark:text-orange-300 flex items-center gap-1.5"><BookMarked className="w-3.5 h-3.5" /> Lectura ampliada</p>
      <h2 className="font-display text-xl font-bold mt-1">
        {a.url ? (
          a.url.startsWith("/") ? <Link href={a.url} className="hover:underline">{a.lectura}</Link> : <a href={a.url} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">{a.lectura} <ExternalLink className="w-4 h-4" /></a>
        ) : a.lectura}
      </h2>
      <p className="text-sm text-muted-foreground mt-1 flex flex-wrap items-center gap-x-3">
        <span>{a.fuente}</span>
        <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> unos {a.minutos} minutos</span>
      </p>
      <p className="text-sm mt-3">Para profundizar la materia a nivel universitario: léela con calma y escribe un reporte de 150 a 300 palabras con estas preguntas como guía.</p>
      <ol className="list-decimal pl-5 mt-2 space-y-1 text-[15px]">
        {a.reporte.map((p) => <li key={p}>{p}</li>)}
      </ol>
      <div className="mt-4">
        {conSesion ? (
          <>
            <Button onClick={escribir} disabled={ocupado} className="fire-btn-primary" data-testid="lectura-ampliada-reporte">
              {ocupado ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <NotebookPen className="w-4 h-4 mr-2" />} Escribir mi reporte en el cuaderno
            </Button>
            <p className="text-xs text-muted-foreground mt-2">Si ya lo empezaste, se abre el mismo.</p>
          </>
        ) : (
          <a href={loginUrl(`/academia/materia/${materiaId}`)}><Button variant="outline">Entra para escribir tu reporte</Button></a>
        )}
        {error && <p className="text-sm text-red-600 mt-2" role="alert">{error}</p>}
      </div>
    </section>
  );
}
