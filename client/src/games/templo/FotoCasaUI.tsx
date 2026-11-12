/**
 * La foto de tu casa (para compartirla): la ciudad toma una foto delante de tu puerta (CiudadWorld.fotoDeCasa) y aquí
 * se le pone el marco del juego, el nombre de tu casa, sus estrellas y el enlace del juego. Se comparte con lo que
 * tenga el teléfono (WhatsApp, TikTok, Facebook…) o se guarda. No lleva el nombre de la persona: solo el de la casa.
 */
import { useContext, useEffect, useState } from "react";
import { Camera, Download, Loader2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NIVELES_CASA, nombreDeBarrio } from "@shared/ciudad";
import { CiudadCtx } from "./CiudadUI";

const ENLACE = "ministerioavivandoelfuego.com/juegos/aprendiz-del-templo";

/** Pone la foto en su marco (1080 × 1350) y devuelve la imagen lista para compartir. */
function enmarcar(foto: HTMLCanvasElement, t: { casa: string; nivel: string; estrellas: number; barrio: string }): Promise<Blob | null> {
  const W = 1080, H = 1350;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d");
  if (!g) return Promise.resolve(null);
  const fondo = g.createLinearGradient(0, 0, 0, H);
  fondo.addColorStop(0, "#2b1d12");
  fondo.addColorStop(1, "#4a3220");
  g.fillStyle = fondo;
  g.fillRect(0, 0, W, H);
  // la foto, cubriendo su marco (con las esquinas redondas)
  const fx = 60, fy = 60, fw = 960, fh = 1000, r = 30;
  const redondo = () => {
    g.beginPath();
    g.moveTo(fx + r, fy);
    g.arcTo(fx + fw, fy, fx + fw, fy + fh, r);
    g.arcTo(fx + fw, fy + fh, fx, fy + fh, r);
    g.arcTo(fx, fy + fh, fx, fy, r);
    g.arcTo(fx, fy, fx + fw, fy, r);
    g.closePath();
  };
  g.save();
  redondo();
  g.clip();
  const k = Math.max(fw / foto.width, fh / foto.height);
  const dw = foto.width * k, dh = foto.height * k;
  g.drawImage(foto, fx + (fw - dw) / 2, fy + (fh - dh) / 2, dw, dh);
  g.restore();
  redondo();
  g.lineWidth = 8;
  g.strokeStyle = "#e2b33c";
  g.stroke();
  // lo de abajo: el nombre de la casa, sus estrellas, el barrio y el enlace
  g.textAlign = "center";
  g.fillStyle = "#f5d57a";
  g.font = "bold 64px Georgia, 'Times New Roman', serif";
  g.fillText(t.casa, W / 2, 1140, W - 120);
  g.font = "52px system-ui, sans-serif";
  g.fillStyle = "#f2b632";
  const llenas = "★".repeat(t.estrellas), vacias = "★".repeat(5 - t.estrellas);
  const ancho = g.measureText(llenas + vacias).width;
  g.textAlign = "left";
  g.fillText(llenas, W / 2 - ancho / 2, 1208);
  g.fillStyle = "#7a6548";
  g.fillText(vacias, W / 2 - ancho / 2 + g.measureText(llenas).width, 1208);
  g.textAlign = "center";
  g.fillStyle = "#f3e6c8";
  g.font = "34px system-ui, sans-serif";
  g.fillText(`${t.nivel} · ${t.barrio} · Jerusalén en línea`, W / 2, 1262, W - 120);
  g.fillStyle = "#d9c49a";
  g.font = "28px system-ui, sans-serif";
  g.fillText(`El aprendiz del templo · ${ENLACE}`, W / 2, 1310, W - 100);
  return new Promise((ok) => c.toBlob((b) => ok(b), "image/jpeg", 0.9));
}

/** El botón «Foto de tu casa» y, al tomarla, la foto con «Compartir» y «Guardar». */
export function FotoDeCasa() {
  const { estado, city } = useContext(CiudadCtx);
  const [foto, setFoto] = useState<{ blob: Blob; url: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  useEffect(() => () => {
    if (foto) URL.revokeObjectURL(foto.url);
  }, [foto]);
  if (!estado || !city) return null;
  const mia = estado.barrio.casas.find((c) => c.esMia);
  const tomar = async () => {
    setBusy(true);
    setAviso(null);
    const lienzo = city.fotoDeCasa();
    const blob = lienzo
      ? await enmarcar(lienzo, {
          casa: mia?.letrero || "Mi casa en Jerusalén",
          nivel: NIVELES_CASA[estado.yo.nivel]?.nombre ?? "",
          estrellas: Math.max(1, Math.min(5, mia?.estrellas ?? 1)),
          barrio: nombreDeBarrio(estado.barrio.n),
        })
      : null;
    setBusy(false);
    if (!blob) return setAviso("No se pudo tomar la foto. Sal de la ventana, mira tu casa y prueba otra vez.");
    setFoto({ blob, url: URL.createObjectURL(blob) });
  };
  const texto = `Mira mi casa en Jerusalén en línea (${mia?.estrellas ?? 1} de 5 estrellas). ¡Ven a jugar El aprendiz del templo conmigo! https://${ENLACE}`;
  const compartir = async () => {
    if (!foto) return;
    const archivo = new File([foto.blob], "mi-casa-en-jerusalen.jpg", { type: "image/jpeg" });
    try {
      if (navigator.canShare?.({ files: [archivo] })) {
        await navigator.share({ files: [archivo], title: "Mi casa en Jerusalén", text: texto });
        return;
      }
      if (navigator.share) {
        await navigator.share({ title: "Mi casa en Jerusalén", text: texto });
        return;
      }
    } catch {
      // cerró el menú de compartir: no pasa nada
      return;
    }
    setAviso("Este navegador no comparte fotos: guárdala y súbela tú.");
  };
  return (
    <>
      <Button size="sm" variant="secondary" className="rounded-full font-bold" disabled={busy} onClick={() => void tomar()} data-testid="casa-foto">
        {busy ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Camera className="mr-1 h-4 w-4" />} Foto de tu casa
      </Button>
      {aviso && <p className="w-full text-xs text-stone-600 dark:text-stone-300">{aviso}</p>}
      {foto && (
        <div className="w-full space-y-2" data-testid="casa-foto-lista">
          <img src={foto.url} alt="La foto de tu casa con el marco del juego" className="w-full rounded-xl border border-amber-300 shadow" />
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400" onClick={() => void compartir()} data-testid="casa-foto-compartir">
              <Share2 className="mr-1 h-4 w-4" /> Compartir
            </Button>
            <a
              href={foto.url}
              download="mi-casa-en-jerusalen.jpg"
              className="inline-flex items-center rounded-full bg-stone-100 px-3 py-1.5 text-xs font-bold dark:bg-stone-800"
              data-testid="casa-foto-guardar"
            >
              <Download className="mr-1 h-4 w-4" /> Guardar la foto
            </a>
          </div>
          <p className="text-[11px] text-stone-500">La foto lleva el nombre de tu casa, sus estrellas y el enlace del juego; tu nombre no aparece.</p>
        </div>
      )}
    </>
  );
}
