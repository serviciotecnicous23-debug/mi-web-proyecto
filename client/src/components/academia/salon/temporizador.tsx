// El temporizador de enfoque del salón: sesiones de estudio (15, 25 o 45 minutos) con su descanso de 5. Sigue contando
// aunque se cambie de página o se cierre el teléfono (guarda cuándo termina); al terminar avisa con un sonido suave y
// una vibración, y suma los minutos al tiempo de estudio del alumno (server/academia-salon.ts).
import { useEffect, useRef, useState } from "react";
import { Coffee, Pause, Play, RotateCcw, Square, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ESTUDIO, SESIONES } from "@shared/academia-salon";

type Modo = "enfoque" | "descanso";
type Estado = { modo: Modo; duracion: number; fin: number | null; restante: number; sumado: boolean };
const CLAVE = "academia:temporizador";

function leer(): Estado {
  try {
    const e = JSON.parse(localStorage.getItem(CLAVE) || "null");
    if (e && (e.modo === "enfoque" || e.modo === "descanso") && Number.isFinite(e.duracion)) return e;
  } catch {
    // (sin almacenamiento: empieza de cero)
  }
  return { modo: "enfoque", duracion: 25 * 60, fin: null, restante: 25 * 60, sumado: false };
}
function guardar(e: Estado) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(e));
  } catch {
    // (sin almacenamiento: dura lo que dure la página)
  }
}

/** Un sonido corto y suave al terminar (sin archivos: lo hace el navegador). */
function campana() {
  try {
    const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    for (const [i, f] of [660, 880].entries()) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = f;
      o.connect(g);
      g.connect(ctx.destination);
      const t = ctx.currentTime + i * 0.25;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.15, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
      o.start(t);
      o.stop(t + 0.65);
    }
    window.setTimeout(() => ctx.close?.(), 1500);
  } catch {
    // (sin sonido)
  }
  navigator.vibrate?.([120, 80, 120]);
}

const mmss = (s: number) => `${String(Math.floor(Math.max(0, s) / 60)).padStart(2, "0")}:${String(Math.max(0, Math.ceil(s)) % 60).padStart(2, "0")}`;

export function Temporizador({ alSumar }: { alSumar: (minutos: number) => Promise<void> }) {
  const { toast } = useToast();
  const [e, setE] = useState<Estado>(leer);
  const [ahora, setAhora] = useState(Date.now());
  const sumando = useRef(false);
  const corre = e.fin != null;
  const restante = corre ? Math.max(0, (e.fin! - ahora) / 1000) : e.restante;

  const cambiar = (n: Estado) => {
    setE(n);
    guardar(n);
  };

  // el reloj
  useEffect(() => {
    if (!corre) return;
    const t = window.setInterval(() => setAhora(Date.now()), 500);
    return () => window.clearInterval(t);
  }, [corre]);

  // al terminar una sesión de enfoque, se suman sus minutos (una sola vez, también si terminó con la página cerrada)
  useEffect(() => {
    if (!corre || restante > 0 || sumando.current) return;
    const terminado = { ...e, fin: null, restante: 0 };
    if (e.modo === "enfoque" && !e.sumado) {
      sumando.current = true;
      const minutos = Math.min(ESTUDIO.porAviso, Math.round(e.duracion / 60));
      campana();
      alSumar(minutos)
        .then(() => toast({ title: "¡Sesión completada!", description: `+${minutos} ${minutos === 1 ? "minuto" : "minutos"} de estudio. Descansa 5 minutos.` }))
        .catch(() => toast({ title: "Sesión completada", description: "No se pudieron guardar los minutos ahora.", variant: "destructive" }))
        .finally(() => {
          sumando.current = false;
        });
      cambiar({ modo: "descanso", duracion: SESIONES.descanso * 60, fin: null, restante: SESIONES.descanso * 60, sumado: false });
    } else {
      campana();
      toast({ title: "Terminó el descanso", description: "¿Otra sesión de estudio?" });
      cambiar({ ...terminado, modo: "enfoque", duracion: 25 * 60, restante: 25 * 60, sumado: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [corre, restante]);

  const empezar = () => cambiar({ ...e, fin: Date.now() + restante * 1000, sumado: false });
  const pausar = () => cambiar({ ...e, fin: null, restante });
  const reiniciar = (duracionMin = e.duracion / 60, modo: Modo = e.modo) => cambiar({ modo, duracion: duracionMin * 60, fin: null, restante: duracionMin * 60, sumado: false });
  /** Terminar antes: suma lo estudiado (desde 1 minuto). */
  const terminarYa = async () => {
    const hecho = Math.floor((e.duracion - restante) / 60);
    reiniciar(e.duracion / 60, "enfoque");
    if (e.modo === "enfoque" && hecho >= 1) {
      try {
        await alSumar(Math.min(ESTUDIO.porAviso, hecho));
        toast({ title: "Sesión guardada", description: `+${hecho} ${hecho === 1 ? "minuto" : "minutos"} de estudio.` });
      } catch (err: any) {
        toast({ title: "No se pudieron guardar los minutos", description: err?.message, variant: "destructive" });
      }
    }
  };

  const avance = e.duracion ? 1 - restante / e.duracion : 0;
  const R = 54;
  const C = 2 * Math.PI * R;
  return (
    <div className="flex flex-col sm:flex-row items-center gap-5" data-testid="salon-temporizador">
      <div className="relative w-36 h-36 shrink-0" role="timer" aria-live="off" aria-label={`${e.modo === "enfoque" ? "Estudio" : "Descanso"}: faltan ${mmss(restante)}`}>
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r={R} fill="none" strokeWidth="8" className="stroke-orange-500/15" />
          <circle
            cx="60"
            cy="60"
            r={R}
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            className={e.modo === "enfoque" ? "stroke-orange-500" : "stroke-emerald-500"}
            strokeDasharray={C}
            strokeDashoffset={C * (1 - Math.min(1, Math.max(0, avance)))}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-bold tabular-nums" data-testid="salon-temporizador-tiempo">{mmss(restante)}</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">{e.modo === "enfoque" ? <><Timer className="w-3 h-3" /> Estudio</> : <><Coffee className="w-3 h-3" /> Descanso</>}</span>
        </div>
      </div>
      <div className="flex-1 w-full space-y-3">
        {e.modo === "enfoque" && !corre && (
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Duración de la sesión">
            {SESIONES.enfoque.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => reiniciar(m, "enfoque")}
                className={`px-3 py-1.5 rounded-full text-sm border ${e.duracion === m * 60 ? "bg-orange-600 text-white border-orange-600" : "border-border hover:bg-muted"}`}
              >
                {m} min
              </button>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {corre ? (
            <Button onClick={pausar} variant="outline" data-testid="salon-pausar"><Pause className="w-4 h-4 mr-1.5" /> Pausar</Button>
          ) : (
            <Button onClick={empezar} className="fire-btn-primary" data-testid="salon-empezar"><Play className="w-4 h-4 mr-1.5" /> {restante < e.duracion ? "Seguir" : e.modo === "enfoque" ? "Empezar a estudiar" : "Empezar el descanso"}</Button>
          )}
          {(corre || restante < e.duracion) && e.modo === "enfoque" && (
            <Button onClick={terminarYa} variant="ghost" data-testid="salon-terminar"><Square className="w-4 h-4 mr-1.5" /> Terminé</Button>
          )}
          {e.modo === "descanso" && !corre && (
            <Button onClick={() => reiniciar(25, "enfoque")} variant="ghost"><RotateCcw className="w-4 h-4 mr-1.5" /> Saltar el descanso</Button>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Estudia con el teléfono en silencio; al terminar suena una campanita y se suman tus minutos. Sigue contando aunque cambies de página.
        </p>
      </div>
    </div>
  );
}
