// El final de una práctica: las estrellas (las nuevas se encienden una por una), la nota, cómo quedó cada objetivo de
// la lección, las medallas nuevas, cuándo vuelve a preguntar el motor y qué sigue.
import { useEffect } from "react";
import { Link } from "wouter";
import { motion, useReducedMotion } from "motion/react";
import { Award, CalendarClock, Flame, RotateCcw, Star } from "lucide-react";
import { NOMBRE_ESTADO, PRACTICAS, type EstadoObjetivo, type IntentoVista, type ResultadoPractica } from "@shared/practicas";
import { sonarFinal } from "./sonido";

const COLOR_ESTADO: Record<EstadoObjetivo, string> = {
  nuevo: "bg-muted text-muted-foreground",
  aprendiendo: "bg-amber-500/15 text-amber-800 dark:text-amber-200",
  dominado: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200",
  firme: "bg-orange-600 text-white",
};

export function EstadoChip({ estado }: { estado: EstadoObjetivo }) {
  return <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-bold ${COLOR_ESTADO[estado]}`}>{NOMBRE_ESTADO[estado]}</span>;
}

export function Estrellas({ n, antes = n, grande = false }: { n: number; antes?: number; grande?: boolean }) {
  const quieto = useReducedMotion();
  return (
    <span className="inline-flex items-center gap-1" aria-label={`${n} de 3 estrellas`}>
      {[0, 1, 2].map((i) => {
        const llena = i < n;
        const nueva = llena && i >= antes;
        return (
          <motion.span
            key={i}
            initial={nueva && !quieto ? { scale: 0, rotate: -40 } : false}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 14, delay: nueva ? 0.25 + (i - antes) * 0.28 : 0 }}
          >
            <Star className={`${grande ? "w-12 h-12" : "w-5 h-5"} ${llena ? "text-amber-500" : "text-muted-foreground/30"}`} fill={llena ? "currentColor" : "none"} strokeWidth={llena ? 1.5 : 2} />
          </motion.span>
        );
      })}
    </span>
  );
}

const fecha = (iso: string) => new Date(iso).toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long" });

export function Resultado({ r, intento, alSalir, alOtraVez }: { r: ResultadoPractica; intento: IntentoVista; alSalir: () => void; alOtraVez?: (modo: "guiada" | "cuenta") => void }) {
  const quieto = useReducedMotion();
  useEffect(() => {
    sonarFinal(r.estrellas);
  }, [r.estrellas]);
  const titulo =
    r.modo === "guiada"
      ? r.puntaje >= 80
        ? "¡Lo aprendiste!"
        : "Buen comienzo"
      : r.modo === "cuenta"
        ? r.puntaje >= 100
          ? "¡Perfecto!"
          : r.puntaje >= PRACTICAS.domina
            ? "¡Dominado!"
            : "Sigue practicando"
        : r.modo === "mision"
          ? r.puntaje >= PRACTICAS.domina
            ? "¡Misión cumplida!"
            : "Misión a medias"
          : "Práctica del día hecha";
  const mensaje =
    r.modo === "guiada"
      ? "Practicaste lo de la lección. Cuando quieras, haz la práctica que cuenta para ganar las otras estrellas."
      : r.modo === "cuenta"
        ? r.puntaje >= PRACTICAS.domina
          ? "Demostraste lo que aprendiste. El motor te lo volverá a preguntar para que no se te olvide."
          : `Para dominarla necesitas ${PRACTICAS.domina} o más. Repasa la lección y vuelve a intentarlo: vale la mejor.`
        : r.modo === "mision"
          ? "Juntaste lo de todas las lecciones de la materia."
          : "Lo que repasaste hoy queda más firme.";
  const puedeCuenta = r.modo === "guiada" && !r.prueba && alOtraVez;
  const puedeOtra = r.modo === "cuenta" && (r.quedanHoy > 0 || r.prueba) && (r.mejor ?? 0) < 100 && alOtraVez;
  return (
    <div className="text-center pt-2" data-testid="resultado-practica">
      <motion.div initial={quieto ? false : { scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 18 }}>
        {r.modo === "guiada" || r.modo === "cuenta" ? (
          <Estrellas n={r.estrellas} antes={r.antes} grande />
        ) : (
          <span className="inline-flex w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-red-500 text-white items-center justify-center shadow-lg">
            <Flame className="w-11 h-11" fill="currentColor" fillOpacity={0.3} />
          </span>
        )}
        <h2 className="mt-3 text-3xl font-black">{titulo}</h2>
        <p className="mt-1 text-5xl font-black text-amber-600 tabular-nums" data-testid="resultado-puntaje">
          {r.puntaje}
          <span className="text-2xl text-muted-foreground"> / 100</span>
        </p>
        <p className="mt-2 text-[15px] text-muted-foreground max-w-sm mx-auto">{mensaje}</p>
        {r.modo === "cuenta" && r.mejor != null && <p className="mt-1 text-sm font-semibold">Tu mejor nota en esta lección: {r.mejor}</p>}
        {r.modo === "mision" && intento.cierre && r.puntaje >= PRACTICAS.domina && (
          <p className="mt-4 rounded-2xl border border-amber-400/60 bg-amber-50 dark:bg-amber-950/30 p-4 text-[15px] leading-relaxed" data-testid="cierre-mision">{intento.cierre}</p>
        )}
        {r.modo === "mision" && r.mejor != null && <p className="mt-2 text-sm font-semibold">Tu mejor misión: {r.mejor}</p>}
      </motion.div>

      {r.objetivos.length > 0 && (
        <div className="mt-6 text-left rounded-3xl border border-border p-4">
          <p className="font-bold mb-3">Lo que dice cada objetivo de la lección</p>
          <ul className="space-y-3">
            {r.objetivos.map((o) => (
              <li key={o.n}>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[14px] leading-snug">{o.texto}</span>
                  <EstadoChip estado={o.estado} />
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div className={`h-full rounded-full ${o.pct >= PRACTICAS.domina ? "bg-emerald-500" : o.pct >= 50 ? "bg-amber-500" : "bg-rose-500"}`} initial={quieto ? false : { width: 0 }} animate={{ width: `${o.pct}%` }} transition={{ duration: 0.8, delay: 0.3 }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {r.medallas.length > 0 && (
        <div className="mt-4 rounded-3xl border border-amber-400/60 bg-amber-50 dark:bg-amber-950/30 p-4">
          {r.medallas.map((m) => (
            <motion.p key={m.clave} initial={quieto ? false : { scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="font-bold flex items-center justify-center gap-2">
              <Award className="w-6 h-6 text-amber-600" /> Medalla nueva: {m.nombre}
            </motion.p>
          ))}
        </div>
      )}

      {r.proxima && !r.prueba && (
        <p className="mt-4 text-sm text-muted-foreground flex items-center justify-center gap-1.5">
          <CalendarClock className="w-4 h-4" /> Te traigo un repaso el {fecha(r.proxima)}.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-2">
        {puedeCuenta && (
          <button type="button" onClick={() => alOtraVez!("cuenta")} className="h-12 rounded-2xl font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600" data-testid="hacer-cuenta">
            Hacer la práctica que cuenta
          </button>
        )}
        {puedeOtra && (
          <button type="button" onClick={() => alOtraVez!("cuenta")} className="h-12 rounded-2xl font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center gap-2" data-testid="otra-vez">
            <RotateCcw className="w-4 h-4" /> Intentar otra vez{!r.prueba && ` (te quedan ${r.quedanHoy} hoy)`}
          </button>
        )}
        {r.siguiente && !r.prueba && (
          <Link href={r.siguiente.href} onClick={alSalir} className={`h-12 rounded-2xl font-bold flex items-center justify-center ${puedeCuenta || puedeOtra ? "border-2 border-border" : "text-white bg-gradient-to-r from-amber-500 to-orange-600"}`}>
            {r.siguiente.texto}
          </Link>
        )}
        <button type="button" onClick={alSalir} className="h-11 rounded-2xl font-semibold text-muted-foreground hover:bg-muted" data-testid="cerrar-resultado">
          {intento.leccion ? "Volver a la práctica" : "Cerrar"}
        </button>
      </div>
    </div>
  );
}
