/**
 * El mapa de Jerusalén en línea: un minimapa redondo arriba a la derecha (centrado en el personaje y
 * girado como la cámara, con su casa, los vecinos y el objetivo de la misión) y, al tocarlo, el mapa de
 * toda la ciudad con botones para ir a cada lugar o caminar solo hasta el objetivo. También muestra lo que
 * cambia cada día: la calle de los siervos con la puerta de quien tiene tu recado de hoy, y el lugar del
 * capítulo de la historia de esta semana (shared/capitulos.ts).
 */
import { useEffect, useRef, useState } from "react";
import { Footprints, Map as MapaIcono, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "./ui";
import { gameStore } from "./store";
import * as P from "./ciudad/plano";
import type { CiudadWorld, MapaVista } from "./ciudad/mundo";
import type { Rect } from "./layout";
import { CALLE_SIERVOS, PERSONAJES_CIUDAD, ZONA_SIERVOS, personajeCiudad, type RecadoEstado } from "@shared/personajes";
import { arcoDeTemporada, type CapituloId, type CapitulosVista } from "@shared/capitulos";

/** Lo que el mapa pide aparte (cambia cada día): el recado de hoy y el lugar del capítulo de la semana. */
type ExtrasMapa = {
  recado: { id: string; x: number; z: number; nombre: string } | null;
  capitulo: { id: CapituloId; x: number; z: number; r: number; icono: string; titulo: string } | null;
};

/** Dónde se ve cada capítulo en la ciudad (ciudad/capitulos3d.ts): la primera torre nueva del muro del oriente, el
 * estanque de Siloé al final del conducto, la escalinata donde ora Ezequías y la plaza de la fiesta. */
const LUGAR_CAPITULO: Record<CapituloId, { x: number; z: number; r: number }> = {
  muro: { x: P.TORRE_X - 4, z: P.TORRES_NUEVAS[0], r: 6 },
  canal: { x: (P.ESTANQUE[0] + P.ESTANQUE[2]) / 2, z: (P.ESTANQUE[1] + P.ESTANQUE[3]) / 2, r: 5 },
  rabsaces: { x: 41, z: 0, r: 7 },
  liberacion: { x: 56, z: -2, r: 13 },
};
let extrasGuardados: { t: number; p: Promise<ExtrasMapa> } | null = null;

async function pedirJson<T>(ruta: string): Promise<T | null> {
  try {
    const r = await fetch(`/api/jerusalen${ruta}`, { credentials: "include", cache: "no-store" });
    return r.ok ? ((await r.json()) as T) : null;
  } catch {
    return null;
  }
}

/** Se piden una vez por minuto como mucho (el minimapa y el mapa grande comparten la respuesta). */
function traerExtras(): Promise<ExtrasMapa> {
  if (extrasGuardados && Date.now() - extrasGuardados.t < 60_000) return extrasGuardados.p;
  const p = Promise.all([pedirJson<{ estado: RecadoEstado }>("/recado"), pedirJson<{ vista: CapitulosVista | null }>("/capitulos")]).then(([rc, cv]) => {
    const e = rc?.estado;
    const quien = e && !e.hecho ? personajeCiudad(e.recado.cadena[e.paso]) : undefined;
    const v = cv?.vista;
    const hoy = v?.hoy;
    const cap = v && hoy ? arcoDeTemporada(v.temporada)?.capitulos.find((c) => c.n === hoy.n) : undefined;
    return {
      recado: quien ? { id: quien.id, x: quien.puerta[0], z: quien.puerta[1], nombre: quien.nombre } : null,
      capitulo: cap ? { id: cap.id, ...LUGAR_CAPITULO[cap.id], icono: cap.icono, titulo: cap.titulo } : null,
    };
  });
  extrasGuardados = { t: Date.now(), p };
  return p;
}

type Lugar = { r: Rect; color: string; nombre?: string };

/** Los lugares fijos de la ciudad (para dibujarlos). */
const LUGARES: Lugar[] = [
  { r: P.MONTE, color: "#d8b45a", nombre: "Templo" },
  { r: P.PLAZA, color: "#e6d3a8", nombre: "Plaza" },
  { r: P.PALACIO, color: "#b79be0", nombre: "Palacio" },
  { r: P.ESCUELA, color: "#9fd49a", nombre: "Escuela" },
  { r: P.CAMARA, color: "#f0d27a" },
  { r: P.SABIDURIA, color: "#c9a8ff" },
  { r: P.MONTE_ORACION, color: "#a9c48a", nombre: "Monte" },
];

/** De la ciudad al mapa: la cámara mira hacia arriba del mapa, como en la pantalla. */
function aMapa(dx: number, dz: number, giro: number, escala: number): [number, number] {
  const s = Math.sin(giro), c = Math.cos(giro);
  return [(dz * s - dx * c) * escala, -(dx * s + dz * c) * escala];
}

function dibujar(cv: HTMLCanvasElement, m: MapaVista, o: { radio: number; centro: { x: number; z: number }; redondo: boolean; nombres: boolean; t: number }, ex: ExtrasMapa | null = null) {
  const ctx = cv.getContext("2d");
  if (!ctx) return;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const W = cv.clientWidth, H = cv.clientHeight;
  if (cv.width !== Math.round(W * dpr)) {
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H / 2;
  const R = Math.min(W, H) / 2 - 2;
  const escala = R / o.radio;
  const p = (x: number, z: number) => {
    const [sx, sy] = aMapa(x - o.centro.x, z - o.centro.z, m.giro, escala);
    return [cx + sx, cy + sy] as [number, number];
  };
  ctx.save();
  ctx.beginPath();
  if (o.redondo) ctx.arc(cx, cy, R, 0, Math.PI * 2);
  else ctx.rect(0, 0, W, H);
  ctx.fillStyle = "rgba(239,226,196,0.92)";
  ctx.fill();
  ctx.clip();
  // los barrios y los límites de la ciudad
  const rect = (r: Rect, color: string, borde?: string) => {
    const a = p(r[0], r[1]), b = p(r[2], r[1]), c = p(r[2], r[3]), d = p(r[0], r[3]);
    ctx.beginPath();
    ctx.moveTo(...a);
    ctx.lineTo(...b);
    ctx.lineTo(...c);
    ctx.lineTo(...d);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    if (borde) {
      ctx.strokeStyle = borde;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };
  const L = P.LIMITES;
  rect([L.minX, L.minZ, L.maxX, L.maxZ], "rgba(214,196,154,0.55)", "rgba(120,90,50,0.6)");
  for (const a of P.AREA_RECT) rect(a as Rect, "rgba(196,160,110,0.35)");
  for (const l of LUGARES) rect(l.r, l.color);
  // la calle de los siervos: la calle y las siete puertas
  rect(ZONA_SIERVOS, "rgba(214,182,128,0.6)");
  rect([CALLE_SIERVOS.x0, CALLE_SIERVOS.z - CALLE_SIERVOS.ancho / 2, CALLE_SIERVOS.x1, CALLE_SIERVOS.z + CALLE_SIERVOS.ancho / 2], "rgba(176,146,104,0.7)");
  ctx.fillStyle = "#7a4a2a";
  for (const sv of PERSONAJES_CIUDAD) {
    const [x, y] = p(sv.puerta[0], sv.puerta[1]);
    ctx.fillRect(x - 1.8, y - 1.8, 3.6, 3.6);
  }
  // el capítulo de esta semana: las torres del muro o el conducto de Siloé, y un círculo rojizo con su dibujo
  if (ex?.capitulo?.id === "muro") {
    ctx.fillStyle = "rgba(150,110,70,0.95)";
    for (const z of P.TORRES_NUEVAS) {
      const [x, y] = p(P.TORRE_X, z);
      ctx.fillRect(x - 3, y - 3, 6, 6);
    }
  }
  if (ex?.capitulo?.id === "canal") {
    ctx.beginPath();
    const [gx, gy] = p(P.GIHON[0], P.GIHON[1]);
    ctx.moveTo(gx, gy);
    for (const [x, z] of P.CONDUCTO) ctx.lineTo(...p(x, z));
    ctx.strokeStyle = "rgba(60,130,200,0.9)";
    ctx.lineWidth = 2;
    ctx.stroke();
    rect(P.ESTANQUE, "rgba(90,160,220,0.8)");
  }
  if (ex?.capitulo) {
    const [x, y] = p(ex.capitulo.x, ex.capitulo.z);
    ctx.beginPath();
    ctx.arc(x, y, Math.max(6, ex.capitulo.r * escala), 0, Math.PI * 2);
    ctx.fillStyle = "rgba(214,90,40,0.16)";
    ctx.fill();
    ctx.setLineDash([4, 3]);
    ctx.strokeStyle = "rgba(170,60,20,0.75)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = `${o.nombres ? 16 : 12}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(ex.capitulo.icono, x, y + (o.nombres ? 6 : 4));
  }
  if (o.nombres) {
    ctx.font = "bold 11px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "#3a2a14";
    for (const l of LUGARES) {
      if (!l.nombre) continue;
      const [x, y] = p((l.r[0] + l.r[2]) / 2, (l.r[1] + l.r[3]) / 2);
      ctx.fillText(l.nombre, x, y + 4);
    }
    const [sx, sy] = p((ZONA_SIERVOS[0] + ZONA_SIERVOS[2]) / 2, ZONA_SIERVOS[3] + 3);
    ctx.fillText("Siervos", sx, sy);
  }
  // los vecinos
  ctx.fillStyle = "#2f6fd6";
  for (const v of m.vecinos) {
    const [x, y] = p(v.x, v.z);
    ctx.beginPath();
    ctx.arc(x, y, 2.6, 0, Math.PI * 2);
    ctx.fill();
  }
  // tu casa
  {
    const [x, y] = p(m.casa.x, m.casa.z);
    ctx.fillStyle = "#8a3a1a";
    ctx.fillRect(x - 4, y - 2, 8, 6);
    ctx.beginPath();
    ctx.moveTo(x - 5.5, y - 2);
    ctx.lineTo(x, y - 7);
    ctx.lineTo(x + 5.5, y - 2);
    ctx.closePath();
    ctx.fill();
  }
  // el recado de hoy: un rollo que late en la puerta de quien te toca
  if (ex?.recado) {
    const [x, y] = p(ex.recado.x, ex.recado.z);
    const lat = 1 + 0.18 * Math.sin(o.t * 5);
    ctx.beginPath();
    ctx.arc(x, y, 7 * lat, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,240,200,0.9)";
    ctx.fill();
    ctx.strokeStyle = "#8a5a1a";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.font = "10px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("📜", x, y + 3.5);
  }
  ctx.restore();
  // el objetivo: un punto dorado que late; si queda fuera, una flecha en el borde
  if (m.objetivo) {
    const [ox, oy] = p(m.objetivo.x, m.objetivo.z);
    const dx = ox - cx, dy = oy - cy;
    const d = Math.hypot(dx, dy);
    const lat = 1 + 0.25 * Math.sin(o.t * 6);
    if (d < R - 6 || !o.redondo) {
      ctx.beginPath();
      ctx.arc(ox, oy, 5.5 * lat, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,196,40,0.95)";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#7a4a00";
      ctx.stroke();
    } else {
      const ux = dx / d, uy = dy / d;
      const bx = cx + ux * (R - 7), by = cy + uy * (R - 7);
      const ang = Math.atan2(uy, ux);
      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(ang);
      ctx.beginPath();
      ctx.moveTo(7 * lat, 0);
      ctx.lineTo(-5, -5);
      ctx.lineTo(-5, 5);
      ctx.closePath();
      ctx.fillStyle = "rgba(255,196,40,0.98)";
      ctx.fill();
      ctx.strokeStyle = "#7a4a00";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    }
  }
  // el personaje: una flecha hacia donde mira
  {
    const [x, y] = p(m.x, m.z);
    const [fx, fy] = aMapa(Math.sin(m.yaw), Math.cos(m.yaw), m.giro, 1);
    const ang = Math.atan2(fy, fx);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(ang);
    ctx.beginPath();
    ctx.moveTo(8, 0);
    ctx.lineTo(-5, -5.5);
    ctx.lineTo(-2.5, 0);
    ctx.lineTo(-5, 5.5);
    ctx.closePath();
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "#1d1a17";
    ctx.lineWidth = 1.6;
    ctx.stroke();
    ctx.restore();
  }
  if (o.redondo) {
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(90,60,20,0.85)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

/** El minimapa redondo (arriba a la derecha): toca para ver el mapa grande. */
export function MiniMapa({ city }: { city: CiudadWorld | null }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [texto, setTexto] = useState<string | null>(null);
  useEffect(() => {
    if (!city) return;
    let t = 0;
    let n = 0;
    let ex: ExtrasMapa | null = null;
    let vivo = true;
    const id = window.setInterval(() => {
      t += 0.2;
      // el recado y el capítulo: al empezar y cada minuto
      if (n++ % 300 === 0) void traerExtras().then((x) => vivo && (ex = x));
      const cv = ref.current;
      if (!cv) return;
      const m = city.mapa();
      dibujar(cv, m, { radio: 46, centro: { x: m.x, z: m.z }, redondo: true, nombres: false, t }, ex);
      setTexto(m.objetivo?.texto ?? null);
    }, 200);
    return () => {
      vivo = false;
      window.clearInterval(id);
    };
  }, [city]);
  if (!city) return null;
  return (
    <button
      type="button"
      className="pointer-events-auto flex flex-col items-center gap-0.5"
      onClick={() => gameStore.push({ kind: "mapa" })}
      title="El mapa: toca para ver toda la ciudad e ir a cada lugar"
      aria-label={`Mapa${texto ? `: tu objetivo es ${texto}` : ""}`}
      data-testid="ciudad-minimapa"
    >
      <canvas ref={ref} className="h-[92px] w-[92px] rounded-full shadow-lg sm:h-[112px] sm:w-[112px]" />
      {texto && <span className="max-w-[112px] truncate rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-bold text-amber-200">🎯 {texto}</span>}
    </button>
  );
}

const IR: { id: "casa" | "templo" | "plaza" | "mercado" | "escuela" | "palacio" | "camara" | "sabiduria" | "oracion" | "siervos"; nombre: string }[] = [
  { id: "casa", nombre: "🏠 Mi casa" },
  { id: "templo", nombre: "🔥 El templo" },
  { id: "plaza", nombre: "⛲ La plaza" },
  { id: "mercado", nombre: "🛒 El mercado" },
  { id: "escuela", nombre: "📜 La escuela" },
  { id: "palacio", nombre: "👑 El palacio" },
  { id: "camara", nombre: "🕯️ La cámara de los sacerdotes" },
  { id: "sabiduria", nombre: "🏛️ La casa de la sabiduría" },
  { id: "oracion", nombre: "⛰️ El monte de la oración" },
  { id: "siervos", nombre: "📜 La calle de los siervos" },
];

/** El mapa de toda la ciudad, con el objetivo y los botones para ir. */
export function MapaView({ city }: { city: CiudadWorld | null }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [m, setM] = useState<MapaVista | null>(null);
  const [ex, setEx] = useState<ExtrasMapa | null>(null);
  const exRef = useRef<ExtrasMapa | null>(null);
  useEffect(() => {
    let vivo = true;
    void traerExtras().then((x) => {
      if (!vivo) return;
      exRef.current = x;
      setEx(x);
    });
    return () => {
      vivo = false;
    };
  }, []);
  useEffect(() => {
    if (!city) return;
    let t = 0;
    const pintar = () => {
      t += 0.2;
      const cv = ref.current;
      if (!cv) return;
      const v = city.mapa();
      const L = P.LIMITES;
      // toda la ciudad (con el monte del templo), centrada
      const centro = { x: (L.minX + L.maxX) / 2 - 6, z: (L.minZ + L.maxZ) / 2 };
      dibujar(cv, v, { radio: 92, centro, redondo: false, nombres: true, t }, exRef.current);
      setM(v);
    };
    pintar();
    const id = window.setInterval(pintar, 200);
    return () => window.clearInterval(id);
  }, [city]);
  const ir = (id: (typeof IR)[number]["id"]) => {
    city?.irA(id);
    gameStore.close();
  };
  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <MapaIcono className="h-5 w-5" /> El mapa de Jerusalén
        </span>
      }
      onClose={() => gameStore.close()}
      testid="ciudad-mapa"
    >
      <div className="space-y-3 p-3 text-sm">
        <canvas ref={ref} className="aspect-square w-full rounded-xl border border-stone-300 dark:border-stone-700" data-testid="mapa-lienzo" />
        <p className="text-[11px] text-stone-500">
          La flecha blanca eres tú; arriba está hacia donde mira la cámara. 🏠 tu casa · 🔵 tus vecinos · 🟡 tu objetivo · 📜 tu recado de hoy
          {ex?.capitulo ? ` · ${ex.capitulo.icono} el capítulo de esta semana` : ""}.
        </p>
        {(ex?.recado || ex?.capitulo) && (
          <div className="grid gap-1.5 sm:grid-cols-2" data-testid="mapa-hoy">
            {ex?.recado && (
              <Button
                variant="secondary"
                size="sm"
                className="justify-start rounded-xl"
                onClick={() => {
                  const id = ex.recado!.id;
                  gameStore.close();
                  setTimeout(() => city?.irAPersonaje(id), 60);
                }}
                data-testid="mapa-ir-recado"
              >
                📜 Tu recado: {ex.recado.nombre}
              </Button>
            )}
            {ex?.capitulo && (
              <Button
                variant="secondary"
                size="sm"
                className="justify-start rounded-xl"
                onClick={() => {
                  city?.caminarA(ex.capitulo!.x, ex.capitulo!.z);
                  gameStore.close();
                }}
                data-testid="mapa-ir-capitulo"
              >
                {ex.capitulo.icono} {ex.capitulo.titulo}
              </Button>
            )}
          </div>
        )}
        {m?.objetivo && (
          <div className="rounded-xl bg-amber-50 p-2.5 dark:bg-amber-950/30" data-testid="mapa-objetivo">
            <p className="font-bold">
              <MapPin className="-mt-0.5 mr-1 inline h-4 w-4 text-amber-600" /> Tu objetivo: {m.objetivo.texto}
            </p>
            <Button
              size="sm"
              className="mt-1.5 w-full rounded-full bg-amber-500 font-bold text-amber-950 hover:bg-amber-400"
              onClick={() => {
                city?.caminarA(m.objetivo!.x, m.objetivo!.z);
                gameStore.close();
              }}
              data-testid="mapa-caminar"
            >
              <Footprints className="mr-1 h-4 w-4" /> Caminar hasta allá
            </Button>
          </div>
        )}
        <div className="grid grid-cols-2 gap-1.5">
          {IR.map((l) => (
            <Button key={l.id} variant="secondary" size="sm" className="justify-start rounded-xl" onClick={() => ir(l.id)} data-testid={`mapa-ir-${l.id}`}>
              {l.nombre}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}
