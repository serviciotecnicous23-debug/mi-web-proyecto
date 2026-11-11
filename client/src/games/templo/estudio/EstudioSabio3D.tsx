/**
 * El lienzo del estudio de «¿Quién es sabio?», detrás de la pantalla del concurso. Mientras se ve, la ciudad duerme
 * (no se dibuja dos veces). El estudio se descarga solo al entrar a la casa de la sabiduría; si el equipo no puede
 * con el 3D, queda el fondo de siempre.
 */
import { useContext, useEffect, useRef } from "react";
import { CiudadCtx } from "../CiudadUI";
import type { EstudioSabio } from "./estudio-sabio";
import type { FigureLook } from "../three/characters";

/** Un equipo modesto (pocos núcleos o poca memoria): menos público y menos luces que se mueven. */
function equipoModesto(): boolean {
  const n = navigator.hardwareConcurrency || 4;
  const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 4;
  return n <= 4 || mem <= 3;
}

export function EstudioSabio3D({
  onListo,
  foco,
  concursante,
}: {
  onListo: (e: EstudioSabio | null) => void;
  /** Dónde va el centro de la toma, de 0 (arriba) a 1 (abajo). */
  foco: number;
  /** Quien se sienta a concursar, si no es el jugador. */
  concursante?: { look: FigureLook; nombre: string } | null;
}) {
  const caja = useRef<HTMLDivElement>(null);
  const estudio = useRef<EstudioSabio | null>(null);
  const focoRef = useRef(foco);
  focoRef.current = foco;
  const { city } = useContext(CiudadCtx);

  useEffect(() => {
    const el = caja.current;
    if (!el) return;
    let vivo = true;
    let e: EstudioSabio | null = null;
    let dormida = true;
    const ro = new ResizeObserver(() => e?.resize());
    void import("./estudio-sabio")
      .then(({ EstudioSabio: Clase }) => {
        if (!vivo) return;
        try {
          const yo = city?.figuraJugador() ?? { look: "aprendiz" as FigureLook, ropa: null, nombre: "" };
          const quien = concursante ? { look: concursante.look, ropa: null, nombre: concursante.nombre } : yo;
          e = new Clase(el, { concursante: quien, calidad: equipoModesto() ? "baja" : "alta" });
          e.resize(focoRef.current);
        } catch (err) {
          console.warn("[estudio] sin 3D:", err);
          e = null;
        }
        estudio.current = e;
        if (import.meta.env.DEV) (window as unknown as { __estudio?: EstudioSabio | null }).__estudio = e;
        dormida = city ? !city.despierta : true;
        if (e && city && !dormida) city.dormir(true);
        ro.observe(el);
        onListo(e);
      })
      .catch((err) => console.warn("[estudio] no se pudo cargar:", err));
    return () => {
      vivo = false;
      ro.disconnect();
      onListo(null);
      estudio.current = null;
      e?.dispose();
      if (e && city && !dormida) city.dormir(false);
    };
    // el estudio se arma una vez por pantalla (quien concursa no cambia mientras está abierta)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    estudio.current?.resize(foco);
  }, [foco]);

  return <div ref={caja} className="pointer-events-none absolute inset-0" />;
}
