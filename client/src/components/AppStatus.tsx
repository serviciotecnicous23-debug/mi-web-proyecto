import { useEffect, useState } from "react";
import { RefreshCw, Wifi, WifiOff, X } from "lucide-react";

/**
 * Avisos de la app: versión nueva y conexión.
 *
 * Antes, al publicarse una versión, la web se recargaba sola (main.tsx): eso cortaba la
 * radio y lo que la persona estuviera escribiendo. Ahora main.tsx lanza el evento
 * "avivando:update-ready" y aquí se ofrece "Actualizar" para que la persona elija.
 */
export function AppStatus() {
  const [updateReady, setUpdateReady] = useState(false);
  const [online, setOnline] = useState(() => (typeof navigator === "undefined" ? true : navigator.onLine));
  const [backOnline, setBackOnline] = useState(false);

  useEffect(() => {
    const onUpdate = () => setUpdateReady(true);
    const goOnline = () => {
      setOnline(true);
      setBackOnline(true);
    };
    const goOffline = () => {
      setOnline(false);
      setBackOnline(false);
    };
    window.addEventListener("avivando:update-ready", onUpdate);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("avivando:update-ready", onUpdate);
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  useEffect(() => {
    if (!backOnline) return;
    const timer = window.setTimeout(() => setBackOnline(false), 3000);
    return () => window.clearTimeout(timer);
  }, [backOnline]);

  if (online && !backOnline && !updateReady) return null;

  return (
    <div className="app-status" aria-live="polite">
      {!online && (
        <div className="app-status__pill app-status__pill--off" role="status" data-testid="status-offline">
          <WifiOff className="h-4 w-4" aria-hidden="true" />
          Sin conexión · lo que ya cargó sigue a mano
        </div>
      )}
      {online && backOnline && (
        <div className="app-status__pill app-status__pill--on" role="status" data-testid="status-online">
          <Wifi className="h-4 w-4" aria-hidden="true" />
          Conexión recuperada
        </div>
      )}
      {updateReady && (
        <div className="app-status__update" role="status" data-testid="status-update">
          <span>Hay una versión nueva de la app.</span>
          <button
            type="button"
            className="app-status__btn"
            onClick={() => window.location.reload()}
            data-testid="button-update-app"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Actualizar
          </button>
          <button
            type="button"
            className="app-status__close"
            aria-label="Más tarde"
            onClick={() => setUpdateReady(false)}
            data-testid="button-update-later"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
