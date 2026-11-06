import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Radio, X } from "lucide-react";
import { api } from "@shared/routes";
import {
  AZURACAST_STATION_SHORTCODE,
  DEFAULT_AZURACAST_STATION_URL,
  type RadioStationPayload,
} from "@shared/radio";

export const RADIO_PATH = "/radio";

/**
 * La radio de la web es la ORIGINAL: la página pública de AzuraCast con el tema de
 * fuego. Se muestra en un iframe para que cualquier cambio de diseño de la radio se vea
 * aquí sin tocar la web.
 *
 * El iframe vive en App.tsx, fuera de las páginas (cada página monta su propio
 * <Layout>), y NO se desmonta al cambiar de página: así la radio sigue sonando
 * mientras la persona navega. Fuera de /radio queda oculto y aparece la barrita
 * flotante para volver o cerrar. Moverlo de sitio en el DOM lo recargaría, por eso
 * siempre está en el mismo contenedor y solo cambia la clase.
 */
function useStationUrl(enabled: boolean) {
  return useQuery({
    queryKey: ["radio-dock-station-url"],
    enabled,
    staleTime: Infinity,
    retry: 1,
    queryFn: async (): Promise<string> => {
      const res = await fetch(api.radio.station.path);
      if (!res.ok) throw new Error("No se pudo leer la emisora");
      const data: RadioStationPayload = await res.json();
      return data.provider?.stationUrl || DEFAULT_AZURACAST_STATION_URL;
    },
  });
}

/** Lo que suena ahora en la emisora (API pública de AzuraCast, con CORS abierto). */
function useOnAir(stationUrl: string | undefined, enabled: boolean) {
  return useQuery({
    queryKey: ["radio-dock-on-air", stationUrl],
    enabled: enabled && !!stationUrl,
    refetchInterval: 30_000,
    staleTime: 20_000,
    retry: false,
    queryFn: async (): Promise<string> => {
      const origin = new URL(stationUrl!).origin;
      const res = await fetch(`${origin}/api/nowplaying/${AZURACAST_STATION_SHORTCODE}`);
      if (!res.ok) return "";
      const data = await res.json();
      const song = data?.now_playing?.song;
      return song?.title ? [song.title, song.artist].filter(Boolean).join(" · ") : "";
    },
  });
}

export function RadioDock() {
  const [location] = useLocation();
  const onRadio = location === RADIO_PATH;
  const [alive, setAlive] = useState(onRadio);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (onRadio) setAlive(true);
  }, [onRadio]);

  // Con la barrita visible, la página deja sitio abajo y el botón de subir se aparta.
  const miniVisible = alive && !onRadio;
  useEffect(() => {
    document.documentElement.classList.toggle("radio-alive", alive);
    return () => document.documentElement.classList.remove("radio-alive");
  }, [alive]);
  useEffect(() => {
    document.documentElement.classList.toggle("radio-mini-open", miniVisible);
    return () => document.documentElement.classList.remove("radio-mini-open");
  }, [miniVisible]);

  const station = useStationUrl(alive);
  const src = station.data ?? (station.isError ? DEFAULT_AZURACAST_STATION_URL : undefined);
  const onAir = useOnAir(src, alive && !onRadio);

  if (!alive) return null;

  const close = () => {
    setAlive(false);
    setLoaded(false);
  };

  return (
    <>
      <div
        className={`radio-dock ${onRadio ? "radio-dock--visible" : "radio-dock--hidden"}`}
        aria-hidden={!onRadio}
        inert={!onRadio}
        data-testid="radio-dock"
      >
        {onRadio && !loaded && (
          <div className="radio-dock__loading" role="status">
            <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
            Abriendo la radio…
          </div>
        )}
        {src && (
          <iframe
            src={src}
            title="Radio Avivando el Fuego"
            // web-share y clipboard-write: el botón "Compartir" de la radio abre la ventana
            // de compartir del teléfono (o copia el enlace) también dentro de la web.
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media; web-share; clipboard-write"
            referrerPolicy="strict-origin-when-cross-origin"
            className="radio-dock__frame"
            onLoad={() => setLoaded(true)}
            data-testid="radio-dock-frame"
          />
        )}
      </div>

      {!onRadio && (
        <div className="radio-mini" role="region" aria-label="Radio abierta" data-testid="radio-mini">
          <Link href={RADIO_PATH} className="radio-mini__open" data-testid="radio-mini-open">
            <span className="radio-mini__icon" aria-hidden="true">
              <Radio className="h-4 w-4" />
            </span>
            <span className="radio-mini__text">
              <span className="radio-mini__title">Radio Avivando el Fuego</span>
              <span className="radio-mini__song">
                {onAir.data ? `En el aire: ${onAir.data}` : "Toca para volver a la radio"}
              </span>
            </span>
          </Link>
          <button
            type="button"
            className="radio-mini__close"
            aria-label="Cerrar la radio"
            onClick={close}
            data-testid="radio-mini-close"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
