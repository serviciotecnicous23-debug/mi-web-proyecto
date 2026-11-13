/**
 * El probador (la casa viva): antes de comprar o de ponerse algo, el personaje aparece vestido con eso, en 3D, y gira
 * despacio; con el dedo (o el ratón) se lo gira para verlo por todos lados. Usa la misma figura de la ciudad
 * (three/characters.ts, Figure.setRopa), así que se ve igual que como lo verán los vecinos.
 */
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { X } from "lucide-react";
import { Figure, newRig, type FigureLook } from "./three/characters";
import { RANURAS, articulo, coloresDeIds, ranuraDe, type RopaIds } from "@shared/mercado";

type Props = {
  /** La vestidura del personaje (la de su escalón y su camino). */
  look: FigureLook;
  /** Lo que lleva puesto ahora. */
  ropa: RopaIds;
  /** Lo que se prueba (se pone encima de lo de ahora). */
  prueba: string | null;
  titulo: string;
  onCerrar: () => void;
  /** Los botones de abajo (comprar, ponérselo…). */
  children?: React.ReactNode;
};

/** La ropa con la prenda que se prueba en su lugar. */
export function ropaConPrueba(ropa: RopaIds, prueba: string | null): RopaIds {
  const a = prueba ? articulo(prueba) : undefined;
  const r = ranuraDe(a);
  return r ? { ...ropa, [r]: prueba } : ropa;
}

/** Un muñeco 3D que gira (sin la ventana): se usa en el probador. */
export function MunecoQueGira({ look, ropa, alto = 300 }: { look: FigureLook; ropa: RopaIds; alto?: number }) {
  const caja = useRef<HTMLDivElement | null>(null);
  const figRef = useRef<Figure | null>(null);
  const giro = useRef({ yaw: 0.4, vel: 0.5, arrastre: null as null | { x: number; yaw: number } });
  const [sinWebgl, setSinWebgl] = useState(false);

  useEffect(() => {
    const el = caja.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setSinWebgl(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.style.cssText = "display:block;width:100%;height:100%;touch-action:none;cursor:grab";
    el.appendChild(canvas);
    const escena = new THREE.Scene();
    escena.add(new THREE.HemisphereLight("#fff4dc", "#6d5a44", 1.35));
    const sol = new THREE.DirectionalLight("#fff1d6", 2.1);
    sol.position.set(2.5, 4, 3.5);
    const contra = new THREE.DirectionalLight("#a9c4ff", 0.8);
    contra.position.set(-3, 2.5, -3);
    escena.add(sol, contra);
    // el piso del probador: una alfombra redonda
    const piso = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.03, 32), new THREE.MeshLambertMaterial({ color: "#a33a2c" }));
    piso.position.y = -0.015;
    const orla = new THREE.Mesh(new THREE.TorusGeometry(0.53, 0.02, 4, 40), new THREE.MeshLambertMaterial({ color: "#e2c27a" }));
    orla.rotation.x = Math.PI / 2;
    escena.add(piso, orla);
    const camara = new THREE.PerspectiveCamera(30, 1, 0.05, 30);
    camara.position.set(0, 1.0, 3.05);
    camara.lookAt(0, 0.62, 0);
    const fig = new Figure(look);
    figRef.current = fig;
    escena.add(fig.root);
    const rig = newRig(0, 0);
    rig.t = 0;
    const medir = () => {
      const r = el.getBoundingClientRect();
      renderer.setSize(Math.max(1, r.width), Math.max(1, r.height), false);
      camara.aspect = Math.max(0.3, r.width / Math.max(1, r.height));
      camara.updateProjectionMatrix();
    };
    medir();
    const obs = new ResizeObserver(medir);
    obs.observe(el);
    let raf = 0;
    let antes = performance.now();
    const cuadro = (ahora: number) => {
      raf = requestAnimationFrame(cuadro);
      const dt = Math.min(0.05, (ahora - antes) / 1000);
      antes = ahora;
      const g = giro.current;
      if (!g.arrastre) g.yaw += g.vel * dt;
      rig.yaw = g.yaw;
      rig.t += dt;
      fig.update(rig);
      renderer.render(escena, camara);
    };
    raf = requestAnimationFrame(cuadro);
    // girarlo con el dedo
    const abajo = (e: PointerEvent) => {
      giro.current.arrastre = { x: e.clientX, yaw: giro.current.yaw };
      canvas.setPointerCapture?.(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const mover = (e: PointerEvent) => {
      const a = giro.current.arrastre;
      if (a) giro.current.yaw = a.yaw + (e.clientX - a.x) * 0.012;
    };
    const arriba = () => {
      giro.current.arrastre = null;
      canvas.style.cursor = "grab";
    };
    canvas.addEventListener("pointerdown", abajo);
    canvas.addEventListener("pointermove", mover);
    canvas.addEventListener("pointerup", arriba);
    canvas.addEventListener("pointercancel", arriba);
    return () => {
      cancelAnimationFrame(raf);
      obs.disconnect();
      canvas.removeEventListener("pointerdown", abajo);
      canvas.removeEventListener("pointermove", mover);
      canvas.removeEventListener("pointerup", arriba);
      canvas.removeEventListener("pointercancel", arriba);
      fig.dispose();
      figRef.current = null;
      for (const o of [piso, orla]) {
        o.geometry.dispose();
        (o.material as THREE.Material).dispose();
      }
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    };
  }, [look]);

  // la ropa cambia sin volver a armar la escena
  useEffect(() => {
    figRef.current?.setRopa(coloresDeIds(ropa));
  }, [ropa, look]);

  if (sinWebgl) return <p className="p-4 text-center text-sm text-stone-500">Tu navegador no puede mostrar el probador en 3D.</p>;
  return (
    <div
      ref={caja}
      className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-b from-amber-50 via-amber-100 to-stone-300 dark:from-stone-700 dark:via-stone-800 dark:to-stone-950"
      style={{ height: alto }}
      data-testid="probador-3d"
      aria-label="El probador: tu personaje con la ropa, girando"
    />
  );
}

/** La ventana del probador: el muñeco que gira, lo que se prueba y sus botones. */
export function Probador({ look, ropa, prueba, titulo, onCerrar, children }: Props) {
  const conPrueba = ropaConPrueba(ropa, prueba);
  const a = prueba ? articulo(prueba) : undefined;
  return (
    <div className="fixed inset-0 z-[85] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm" onClick={onCerrar} role="dialog" aria-label={titulo} data-testid="probador">
      <div className="w-full max-w-sm space-y-2 rounded-3xl bg-white p-3 text-stone-800 shadow-2xl dark:bg-stone-900 dark:text-stone-100" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <p className="font-black">{titulo}</p>
          <button type="button" onClick={onCerrar} className="rounded-full bg-stone-100 p-1 dark:bg-stone-800" aria-label="Cerrar el probador">
            <X className="h-4 w-4" />
          </button>
        </div>
        <MunecoQueGira look={look} ropa={conPrueba} />
        {a && (
          <p className="text-center text-[12px] text-stone-500">
            <b className="text-stone-800 dark:text-stone-100">
              {a.icono} {a.nombre}
            </b>{" "}
            · {a.detalle}
          </p>
        )}
        <p className="text-center text-[10px] text-stone-400">Gíralo con el dedo para verlo por todos lados. Así te verán tus vecinos en la ciudad.</p>
        {children && <div className="flex flex-wrap justify-center gap-2">{children}</div>}
      </div>
    </div>
  );
}

/** La ropa puesta como la manda el servidor (todas las ranuras). */
export function ropaCompleta(r: RopaIds | null | undefined): RopaIds {
  return Object.fromEntries(RANURAS.map((k) => [k, r?.[k] ?? null])) as RopaIds;
}
