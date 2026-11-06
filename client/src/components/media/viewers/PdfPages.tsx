import { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import workerUrl from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?url";
import { Loader2, ZoomIn, ZoomOut } from "lucide-react";
import { loadBytes } from "../file-bytes";

// La versión "legacy" funciona también en celulares viejos (iPhone con iOS 15-16).
pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

type Doc = Awaited<ReturnType<typeof pdfjs.getDocument>["promise"]>;

function PdfPage({ doc, n, width, ratio }: { doc: Doc; n: number; width: number; ratio: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(n <= 2);
  const [ready, setReady] = useState(false);

  // Solo se dibujan las páginas cercanas: un PDF de 100 páginas no llena la memoria del celular.
  useEffect(() => {
    const el = boxRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    // La raíz es el panel que se desplaza (no la pantalla): así se preparan las páginas siguientes.
    const root = el.closest(".viewer__body");
    const io = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { root, rootMargin: "150% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !width) return;
    if (!near) {
      canvas.width = 0;
      canvas.height = 0;
      setReady(false);
      return;
    }
    let cancelled = false;
    let task: { cancel: () => void; promise: Promise<unknown> } | null = null;
    (async () => {
      const page = await doc.getPage(n);
      if (cancelled) return;
      const base = page.getViewport({ scale: 1 });
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = page.getViewport({ scale: (width / base.width) * dpr });
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${Math.floor(viewport.height / dpr)}px`;
      task = page.render({ canvas, viewport }) as unknown as { cancel: () => void; promise: Promise<unknown> };
      await task.promise;
      if (!cancelled) setReady(true);
    })().catch(() => {
      /* página cancelada por el zoom o al cerrar */
    });
    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [doc, n, width, near]);

  return (
    <div ref={boxRef} className="pdf-page" style={{ width, minHeight: Math.round(width * ratio) }} data-page={n}>
      {!ready && <span className="pdf-page__wait">Página {n}</span>}
      <canvas ref={canvasRef} aria-label={`Página ${n}`} />
    </div>
  );
}

export default function PdfPages({ url, onError }: { url: string; onError: (message: string) => void }) {
  const [doc, setDoc] = useState<Doc | null>(null);
  const [ratio, setRatio] = useState(1.414);
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    let task: ReturnType<typeof pdfjs.getDocument> | null = null;
    loadBytes(url)
      .then((buf) => {
        if (!alive) throw new Error("cerrado");
        task = pdfjs.getDocument({ data: new Uint8Array(buf), useWasm: false });
        return task.promise;
      })
      .then(async (d) => {
        if (!alive) return;
        const first = await d.getPage(1);
        const vp = first.getViewport({ scale: 1 });
        setRatio(vp.height / vp.width);
        setDoc(d);
      })
      .catch((err: Error) => alive && onError(/password/i.test(err?.name + err?.message) ? "Este PDF tiene contraseña." : "No se pudo abrir el PDF aquí."));
    return () => {
      alive = false;
      (task as { destroy?: () => void } | null)?.destroy?.();
    };
  }, [url, onError]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(Math.max(240, Math.min(el.clientWidth - 24, 980))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pageWidth = Math.round(width * zoom);
  return (
    <div ref={wrapRef} className="pdf-view">
      {!doc ? (
        <div className="viewer__loading"><Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" /> Abriendo el PDF…</div>
      ) : (
        <>
          <div className="pdf-view__tools" role="toolbar" aria-label="Zoom del PDF">
            <span>{doc.numPages} {doc.numPages === 1 ? "página" : "páginas"}</span>
            <button type="button" onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.2).toFixed(1)))} aria-label="Alejar"><ZoomOut className="h-4 w-4" /></button>
            <button type="button" onClick={() => setZoom(1)} aria-label="Ajustar al ancho">{Math.round(zoom * 100)}%</button>
            <button type="button" onClick={() => setZoom((z) => Math.min(3, +(z + 0.2).toFixed(1)))} aria-label="Acercar"><ZoomIn className="h-4 w-4" /></button>
          </div>
          <div className="pdf-view__pages">
            {Array.from({ length: doc.numPages }, (_, i) => (
              <PdfPage key={i} doc={doc} n={i + 1} width={pageWidth} ratio={ratio} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
