/**
 * El lienzo del aula, detrás de la pantalla de la clase. Mientras se ve, la ciudad duerme (no se dibuja dos veces).
 * La escena se descarga solo al entrar a clase; si el equipo no puede con el 3D, queda el fondo de siempre.
 */
import { useContext, useEffect, useRef } from "react";
import { CiudadCtx } from "../CiudadUI";
import type { AulaEscena } from "./escena";
import type { FigureLook } from "../three/characters";
import type { AulaDef, MaestroAula } from "@shared/aula";

/** Un equipo modesto (pocos núcleos o poca memoria): sin sombras ni polvo en la luz. */
function equipoModesto(): boolean {
  const n = navigator.hardwareConcurrency || 4;
  const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 4;
  return n <= 4 || mem <= 3;
}

export function Aula3D({ aula, maestro, foco, onListo }: { aula: AulaDef; maestro: MaestroAula; foco: number; onListo: (e: AulaEscena | null) => void }) {
  const caja = useRef<HTMLDivElement>(null);
  const escena = useRef<AulaEscena | null>(null);
  const focoRef = useRef(foco);
  focoRef.current = foco;
  const maestroRef = useRef(maestro);
  maestroRef.current = maestro;
  const { city } = useContext(CiudadCtx);

  useEffect(() => {
    const el = caja.current;
    if (!el) return;
    let vivo = true;
    let e: AulaEscena | null = null;
    let dormida = true;
    const ro = new ResizeObserver(() => e?.resize());
    void import("./escena")
      .then(({ AulaEscena: Clase }) => {
        if (!vivo) return;
        try {
          const yo = city?.figuraJugador() ?? { look: "aprendiz" as FigureLook, ropa: null, nombre: "" };
          e = new Clase(el, { aula, maestro: maestroRef.current, alumno: yo, calidad: equipoModesto() ? "baja" : "alta" });
          e.resize(focoRef.current);
        } catch (err) {
          console.warn("[aula] sin 3D:", err);
          e = null;
        }
        escena.current = e;
        if (import.meta.env.DEV) (window as unknown as { __aula?: AulaEscena | null }).__aula = e;
        dormida = city ? !city.despierta : true;
        if (e && city && !dormida) city.dormir(true);
        ro.observe(el);
        onListo(e);
      })
      .catch((err) => console.warn("[aula] no se pudo cargar:", err));
    return () => {
      vivo = false;
      ro.disconnect();
      onListo(null);
      escena.current = null;
      e?.dispose();
      if (e && city && !dormida) city.dormir(false);
    };
    // el aula se arma una vez por clase
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aula.id]);

  useEffect(() => {
    escena.current?.resize(foco);
  }, [foco]);

  useEffect(() => {
    escena.current?.setMaestro(maestro);
  }, [maestro]);

  return <div ref={caja} className="pointer-events-none absolute inset-0" />;
}
