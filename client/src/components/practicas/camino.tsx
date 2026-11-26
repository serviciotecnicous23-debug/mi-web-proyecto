// El camino de prácticas de una materia: un sendero con una parada por lección (sus estrellas) y la misión al final.
// Va en la página de la materia; cada parada abre la práctica de su lección.
import { Link } from "wouter";
import { motion, useReducedMotion } from "motion/react";
import { Crown, Flag, Lock, Star } from "lucide-react";
import type { CaminoMateria } from "@shared/practicas";
import { useCamino } from "./api";

function Parada({ p, i, quieto }: { p: CaminoMateria["paradas"][number]; i: number; quieto: boolean | null }) {
  const lado = i % 2 === 0 ? "self-start" : "self-end";
  const contenido = (
    <motion.span
      initial={quieto ? false : { opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05 }}
      className={`flex items-center gap-3 ${i % 2 === 0 ? "" : "flex-row-reverse text-right"}`}
    >
      <span
        className={`relative w-16 h-16 rounded-full flex items-center justify-center text-xl font-black shadow-md border-4 ${
          !p.existe || !p.abierta
            ? "bg-muted text-muted-foreground border-muted"
            : p.estrellas >= 3
              ? "bg-gradient-to-br from-amber-400 to-orange-600 text-white border-amber-200 dark:border-amber-700"
              : p.guiada
                ? "bg-gradient-to-br from-amber-300 to-amber-500 text-white border-amber-100 dark:border-amber-800"
                : "bg-card text-amber-700 dark:text-amber-300 border-amber-400"
        }`}
      >
        {!p.abierta ? <Lock className="w-6 h-6" /> : p.leccion.n}
      </span>
      <span className="max-w-[60vw] sm:max-w-[240px]">
        <span className="block text-sm font-bold leading-tight">{p.leccion.titulo}</span>
        <span className="inline-flex gap-0.5 mt-1" aria-label={`${p.estrellas} de 3 estrellas`}>
          {[0, 1, 2].map((k) => (
            <Star key={k} className={`w-4 h-4 ${k < p.estrellas ? "text-amber-500" : "text-muted-foreground/30"}`} fill={k < p.estrellas ? "currentColor" : "none"} />
          ))}
        </span>
        {!p.existe && <span className="block text-xs text-muted-foreground">Práctica en preparación</span>}
        {p.existe && !p.abierta && <span className="block text-xs text-muted-foreground">Se abre al terminar la lección</span>}
      </span>
    </motion.span>
  );
  return (
    <li className={`${lado} w-fit`}>
      {p.existe && p.abierta ? (
        <Link href={`/academia/practica/${p.leccion.id}`} className="block rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500" data-testid={`parada-${p.leccion.n}`}>
          {contenido}
        </Link>
      ) : (
        <div data-testid={`parada-${p.leccion.n}`}>{contenido}</div>
      )}
    </li>
  );
}

export function CaminoPracticas({ materiaId }: { materiaId: string }) {
  const q = useCamino(materiaId);
  const quieto = useReducedMotion();
  const c = q.data;
  if (!c || !c.paradas.some((p) => p.existe)) return null;
  return (
    <section id="camino-practicas" className="mb-10 scroll-mt-[calc(var(--app-nav-h)+1rem)]" data-testid="camino-practicas">
      <div className="flex items-end justify-between gap-3 mb-2">
        <h2 className="font-display text-2xl font-bold">Camino de prácticas</h2>
        <span className="text-sm font-semibold inline-flex items-center gap-1"><Star className="w-4 h-4 text-amber-500" fill="currentColor" /> {c.estrellas} de {c.posibles}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Cada lección tiene su práctica: la puedes repetir cuando quieras y vale tu mejor intento.{" "}
        {c.obligatoria
          ? `Son obligatorias para el examen final y entran en tu nota${c.componente != null ? ` (llevas ${c.componente})` : ""}.`
          : c.aprobada
            ? "Ya aprobaste la materia: practica cuando quieras. Tu nota no baja, y con el reto de dominio de cada lección puedes subirla."
            : c.cuentaEnNota
              ? `Las prácticas entran en tu nota${c.componente != null ? ` (llevas ${c.componente})` : ""}.`
              : "Te ayudan a no olvidar."}
      </p>
      {c.reto && (
        <div className="mb-4 rounded-2xl border-2 border-amber-500/60 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/20 px-4 py-3" data-testid="camino-reto">
          <p className="font-bold flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-600" /> Puntos extra: {c.reto.extra} de {c.reto.posible}
          </p>
          <p className="text-sm text-muted-foreground mt-0.5">
            {c.reto.posible === 0
              ? "Tu nota ya es 100."
              : `Dominaste ${c.reto.dominadas} de ${c.reto.lecciones} retos. Cada reto de dominio (90 o más, sin pistas) completa su parte de lo que te falta para 100: entra a la práctica de cada lección.`}
          </p>
        </div>
      )}
      <div className="relative rounded-3xl border border-border bg-gradient-to-b from-amber-50/60 to-transparent dark:from-amber-950/20 p-4 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M 20 0 C 80 15, 80 25, 50 40 S 20 70, 50 80 S 80 95, 50 100" fill="none" stroke="currentColor" strokeOpacity={0.12} strokeWidth={6} strokeDasharray="1 3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <ol className="relative flex flex-col gap-5">
          {c.paradas.map((p, i) => (
            <Parada key={p.leccion.id} p={p} i={i} quieto={quieto} />
          ))}
          <li className="self-center mt-2">
            {c.mision.abierta ? (
              <Link href={`/academia/practicar/mision/${c.materia.id}`} className="flex flex-col items-center gap-1 text-center" data-testid="mision-abierta">
                <span className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 text-white flex items-center justify-center shadow-lg rotate-3">
                  <Flag className="w-9 h-9" />
                </span>
                <span className="font-extrabold">{c.mision.titulo}</span>
                <span className="text-xs text-muted-foreground">{c.mision.mejor != null ? `Tu mejor: ${c.mision.mejor}` : "La misión de la materia: un reto con todas las lecciones"}</span>
              </Link>
            ) : (
              <div className="flex flex-col items-center gap-1 text-center opacity-70" data-testid="mision-cerrada">
                <span className="w-20 h-20 rounded-3xl bg-muted text-muted-foreground flex items-center justify-center"><Flag className="w-9 h-9" /></span>
                <span className="font-bold">{c.mision.titulo}</span>
                {c.mision.falta && <span className="text-xs text-muted-foreground max-w-[220px]">{c.mision.falta}</span>}
              </div>
            )}
          </li>
        </ol>
      </div>
    </section>
  );
}
