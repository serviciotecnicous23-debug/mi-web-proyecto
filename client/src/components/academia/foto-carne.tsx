// La foto del carné: el alumno elige una foto, la encuadra en el marco del carné (4:5: se arrastra para moverla y se
// acerca con la barra) y se guarda recortada a 600 × 750 (POST /api/upload/file en la carpeta «academia» y después
// POST /api/academia/foto). Se puede quitar para volver a la foto del perfil o a las iniciales.
import { useEffect, useRef, useState } from "react";
import { Camera, Check, Trash2, X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadFile } from "@/components/media/upload";
import { guardarFotoCarne } from "@/components/academia/api";

const ANCHO = 600;
const ALTO = 750;
const VISTA = 200;
const PROPORCION = ANCHO / ALTO;

type Encuadre = { zoom: number; cx: number; cy: number };

/** El mayor rectángulo 4:5 que cabe en la foto (con zoom 1). */
function base(b: ImageBitmap) {
  return b.width / b.height > PROPORCION ? { w: b.height * PROPORCION, h: b.height } : { w: b.width, h: b.width / PROPORCION };
}
function limitar(b: ImageBitmap, e: Encuadre): Encuadre {
  const { w, h } = base(b);
  const ww = w / e.zoom;
  const hh = h / e.zoom;
  return { zoom: e.zoom, cx: Math.min(b.width - ww / 2, Math.max(ww / 2, e.cx)), cy: Math.min(b.height - hh / 2, Math.max(hh / 2, e.cy)) };
}
function recorte(b: ImageBitmap, e: Encuadre) {
  const { w, h } = base(b);
  const sw = w / e.zoom;
  const sh = h / e.zoom;
  return { sx: e.cx - sw / 2, sy: e.cy - sh / 2, sw, sh };
}

export function FotoCarne({ foto, propia, iniciales, alGuardar }: { foto: string | null; propia: boolean; iniciales: string; alGuardar: () => void }) {
  const [img, setImg] = useState<ImageBitmap | null>(null);
  const [enc, setEnc] = useState<Encuadre | null>(null);
  const [ocupado, setOcupado] = useState<"" | "subiendo" | "guardando" | "quitando">("");
  const [error, setError] = useState<string | null>(null);
  const lienzo = useRef<HTMLCanvasElement>(null);
  const entrada = useRef<HTMLInputElement>(null);
  const arrastre = useRef<{ x: number; y: number; cx: number; cy: number } | null>(null);

  useEffect(() => {
    if (!img || !enc || !lienzo.current) return;
    const c = lienzo.current;
    const r = recorte(img, enc);
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(img, r.sx, r.sy, r.sw, r.sh, 0, 0, c.width, c.height);
  }, [img, enc]);

  const elegir = async (file?: File) => {
    setError(null);
    if (entrada.current) entrada.current.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Elige una foto (JPG, PNG o WEBP).");
      return;
    }
    try {
      const b = await createImageBitmap(file, { imageOrientation: "from-image" });
      if (b.width < 240 || b.height < 240) {
        setError("La foto es muy pequeña: elige una más grande, de al menos 240 × 240.");
        return;
      }
      setImg(b);
      setEnc(limitar(b, { zoom: 1, cx: b.width / 2, cy: b.height * 0.42 }));
    } catch {
      setError("No se pudo abrir esa foto. Prueba con otra en JPG o PNG.");
    }
  };

  const cancelar = () => {
    img?.close?.();
    setImg(null);
    setEnc(null);
    setError(null);
  };

  const guardar = async () => {
    if (!img || !enc) return;
    setOcupado("subiendo");
    setError(null);
    try {
      const c = document.createElement("canvas");
      c.width = ANCHO;
      c.height = ALTO;
      const ctx = c.getContext("2d")!;
      ctx.imageSmoothingQuality = "high";
      const r = recorte(img, enc);
      ctx.drawImage(img, r.sx, r.sy, r.sw, r.sh, 0, 0, ANCHO, ALTO);
      const blob: Blob | null = await new Promise((ok) => c.toBlob(ok, "image/webp", 0.9));
      if (!blob) throw new Error("No se pudo preparar la foto. Intenta de nuevo.");
      const tipo = blob.type || "image/webp";
      const subida = await uploadFile(new File([blob], tipo === "image/webp" ? "foto-carne.webp" : "foto-carne.png", { type: tipo }), { folder: "academia" });
      setOcupado("guardando");
      await guardarFotoCarne(subida.url);
      cancelar();
      alGuardar();
    } catch (e: any) {
      setError(e?.message || "No se pudo guardar la foto. Intenta de nuevo.");
    } finally {
      setOcupado("");
    }
  };

  const quitar = async () => {
    setOcupado("quitando");
    setError(null);
    try {
      await guardarFotoCarne(null);
      alGuardar();
    } catch (e: any) {
      setError(e?.message || "No se pudo quitar la foto.");
    } finally {
      setOcupado("");
    }
  };

  const tocar = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!enc) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    arrastre.current = { x: e.clientX, y: e.clientY, cx: enc.cx, cy: enc.cy };
  };
  const mover = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const a = arrastre.current;
    if (!a || !img || !enc) return;
    const escala = base(img).w / enc.zoom / VISTA;
    setEnc(limitar(img, { zoom: enc.zoom, cx: a.cx - (e.clientX - a.x) * escala, cy: a.cy - (e.clientY - a.y) * escala }));
  };
  const soltar = () => {
    arrastre.current = null;
  };

  return (
    <section className="glass-card p-5" data-testid="foto-carne">
      <h2 className="font-semibold flex items-center gap-2"><Camera className="w-4 h-4 text-orange-600" /> La foto de tu carné</h2>
      <p className="text-sm text-muted-foreground mt-1">De frente, con buena luz y el rostro despejado, como la foto de un documento. Solo se usa en tu carné.</p>
      <input ref={entrada} type="file" accept="image/*" className="hidden" onChange={(e) => elegir(e.target.files?.[0])} data-testid="foto-carne-archivo" />

      {img && enc ? (
        <div className="mt-4 flex flex-col sm:flex-row gap-5 items-start">
          <canvas
            ref={lienzo}
            width={VISTA * 2}
            height={(VISTA * 2) / PROPORCION}
            style={{ width: VISTA, height: VISTA / PROPORCION, touchAction: "none" }}
            className="rounded-xl border-2 border-orange-500 cursor-grab active:cursor-grabbing bg-muted"
            onPointerDown={tocar}
            onPointerMove={mover}
            onPointerUp={soltar}
            onPointerCancel={soltar}
            aria-label="Vista previa de la foto del carné: arrástrala para moverla"
            data-testid="foto-carne-encuadre"
          />
          <div className="flex-1 w-full space-y-4">
            <p className="text-sm">Arrastra la foto para centrar tu rostro y acércala con la barra.</p>
            <label className="block text-sm">
              <span className="flex items-center gap-1.5 mb-1.5"><ZoomIn className="w-4 h-4" /> Acercar</span>
              <input
                type="range" min={1} max={3} step={0.01} value={enc.zoom}
                onChange={(e) => setEnc(limitar(img, { ...enc, zoom: Number(e.target.value) }))}
                className="w-full accent-orange-600" data-testid="foto-carne-zoom"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <Button onClick={guardar} disabled={!!ocupado} className="fire-btn-primary" data-testid="foto-carne-guardar">
                <Check className="w-4 h-4 mr-1.5" /> {ocupado === "subiendo" ? "Subiendo…" : ocupado === "guardando" ? "Guardando…" : "Guardar esta foto"}
              </Button>
              <Button variant="outline" onClick={() => entrada.current?.click()} disabled={!!ocupado}>Elegir otra</Button>
              <Button variant="ghost" onClick={cancelar} disabled={!!ocupado}><X className="w-4 h-4 mr-1" /> Cancelar</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex items-center gap-4">
          <div className="w-16 h-20 rounded-lg overflow-hidden bg-orange-200 dark:bg-orange-900/60 border border-orange-500/40 flex items-center justify-center shrink-0">
            {foto ? <img src={foto} alt="" className="w-full h-full object-cover" /> : <span className="font-bold text-orange-800 dark:text-orange-200">{iniciales}</span>}
          </div>
          <div className="flex-1">
            <p className="text-sm" data-testid="foto-carne-estado">{propia ? "Tienes tu foto en el carné." : foto ? "Tu carné usa la foto de tu perfil." : "Tu carné muestra tus iniciales."}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Button size="sm" onClick={() => entrada.current?.click()} disabled={!!ocupado} className="fire-btn-primary" data-testid="foto-carne-elegir">
                <Camera className="w-4 h-4 mr-1.5" /> {propia ? "Cambiar la foto" : "Poner mi foto"}
              </Button>
              {propia && (
                <Button size="sm" variant="outline" onClick={quitar} disabled={!!ocupado} data-testid="foto-carne-quitar">
                  <Trash2 className="w-4 h-4 mr-1.5" /> {ocupado === "quitando" ? "Quitando…" : "Quitar"}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      {error && <p className="text-sm text-red-600 dark:text-red-400 mt-3" role="alert">{error}</p>}
    </section>
  );
}
