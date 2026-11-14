// El video de YouTube de una lección, con la API del reproductor (www.youtube.com/iframe_api): cuenta lo visto de
// corrido desde el principio (adelantar no suma) y lo avisa cada 5 segundos, para abrir el repaso cuando se vieron
// los primeros minutos (shared/academia.ts, «LECTURA»). El servidor nunca cuenta más que el tiempo que pasó.
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let cargando: Promise<any> | null = null;
function cargarYouTube(): Promise<any> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!cargando) {
    cargando = new Promise((resolve) => {
      const previo = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previo?.();
        resolve(window.YT);
      };
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      s.async = true;
      document.head.appendChild(s);
    });
  }
  return cargando;
}

export function VideoYouTube({ id, titulo, alProgresar }: { id: string; titulo: string; alProgresar?: (segundos: number) => void }) {
  const caja = useRef<HTMLDivElement>(null);
  const avisar = useRef(alProgresar);
  avisar.current = alProgresar;
  const [fallo, setFallo] = useState(false);
  useEffect(() => {
    let vivo = true;
    let player: any = null;
    // si el reproductor no llega a cargar (red lenta, bloqueado), se avisa: el repaso se abre igual con el tiempo
    const espera = window.setTimeout(() => {
      if (vivo && !player) setFallo(true);
    }, 12000);
    let reloj: number | undefined;
    let visto = 0;
    let avisado = -1;
    const tick = () => {
      const t = Number(player?.getCurrentTime?.() ?? 0);
      // solo cuenta lo visto de corrido: un salto hacia adelante no suma (al volver, sigue contando)
      if (t > visto && t - visto <= 2.5) visto = t;
      const s = Math.floor(visto);
      if (s - avisado >= 5) {
        avisado = s;
        avisar.current?.(s);
      }
    };
    cargarYouTube().then((YT) => {
      if (!vivo || !caja.current) return;
      player = new YT.Player(caja.current, {
        videoId: id,
        width: "100%",
        height: "100%",
        playerVars: { rel: 0, modestbranding: 1, playsinline: 1 },
        events: {
          onError: () => {
            if (vivo) setFallo(true);
          },
          onStateChange: (e: any) => {
            if (e.data === YT.PlayerState.PLAYING) {
              if (!reloj) reloj = window.setInterval(tick, 1000);
            } else if (reloj) {
              window.clearInterval(reloj);
              reloj = undefined;
              tick();
            }
          },
        },
      });
    });
    return () => {
      vivo = false;
      window.clearTimeout(espera);
      if (reloj) window.clearInterval(reloj);
      try {
        player?.destroy?.();
      } catch {
        // el reproductor ya no estaba
      }
    };
  }, [id]);
  return (
    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black" data-testid="video-youtube">
      <div ref={caja} className="w-full h-full" title={titulo} />
      {fallo && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center text-sm text-white bg-black/85" role="status" data-testid="video-no-carga">
          <p>No se pudo cargar el video aquí.</p>
          <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer" className="underline font-medium">Verlo en YouTube</a>
          <p className="text-xs text-white/70">El repaso se abre igual cuando pase el tiempo de la lección.</p>
        </div>
      )}
    </div>
  );
}
