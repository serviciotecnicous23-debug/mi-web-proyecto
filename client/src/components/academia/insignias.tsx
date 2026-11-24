// Las insignias de las materias aprobadas (23-nov-2026, pedido de Luis): cada materia ya no da un certificado, sino su
// insignia, enmarcada como una placa en la vitrina del alumno, con su nota y su medalla. Los certificados quedan para
// los logros mayores (el nivel completo, la especialidad y la graduación), para no quitarles su valor.
import { motion, useReducedMotion } from "motion/react";
import { Award, Flame } from "lucide-react";
import { NOMBRE_MEDALLA, medallaDe, type InsigniaMateria, type Medalla } from "@shared/academia-base";

const MEDALLON: Record<Medalla | "sin", string> = {
  oro: "from-yellow-300 via-amber-400 to-amber-600 text-amber-950 shadow-amber-500/40",
  plata: "from-slate-100 via-slate-300 to-slate-500 text-slate-800 shadow-slate-400/40",
  bronce: "from-orange-300 via-orange-500 to-amber-800 text-orange-950 shadow-orange-600/40",
  sin: "from-stone-300 to-stone-500 text-stone-900 shadow-stone-500/30",
};

const fecha = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" }) : null);

const DE_VIA: Record<string, string> = { suficiencia: "Por suficiencia", convalidada: "Convalidada" };

/** Una insignia enmarcada: el marco de madera, el paspartú claro, el medallón del color de la medalla y los datos. */
export function InsigniaEnmarcada({ i, grande = false, indice = 0 }: { i: InsigniaMateria; grande?: boolean; indice?: number }) {
  const quieto = useReducedMotion();
  const medalla = i.medalla ?? medallaDe(i.nota);
  return (
    <motion.figure
      initial={quieto ? false : { opacity: 0, y: 12, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(indice, 8) * 0.04, type: "spring", stiffness: 220, damping: 22 }}
      className={`rounded-2xl p-[7px] bg-gradient-to-br from-stone-600 via-stone-800 to-stone-950 shadow-lg ${grande ? "max-w-[260px]" : ""}`}
      data-testid={`insignia-${i.materiaId}`}
    >
      <div className="rounded-[11px] p-[3px] bg-gradient-to-br from-amber-200/70 via-amber-400/40 to-amber-200/70">
        <div className="rounded-[9px] bg-[#fbf7ee] dark:bg-[#1f1a14] px-3 pt-4 pb-3 flex flex-col items-center text-center">
          <span className={`relative inline-flex items-center justify-center rounded-full bg-gradient-to-br shadow-lg ${MEDALLON[medalla ?? "sin"]} ${grande ? "w-20 h-20" : "w-14 h-14"}`}>
            <span className="absolute inset-[5px] rounded-full border-2 border-white/50" aria-hidden />
            <Flame className={grande ? "w-9 h-9" : "w-6 h-6"} fill="currentColor" fillOpacity={0.35} />
          </span>
          <figcaption className="mt-2.5 w-full">
            <span className={`block font-bold leading-tight text-stone-900 dark:text-amber-50 ${grande ? "text-[16px]" : "text-[13px]"} line-clamp-3`}>{i.titulo}</span>
            <span className="block text-[11px] text-stone-600 dark:text-stone-300 mt-1">
              {i.especialidad ? i.especialidad : i.nivel ? `Nivel ${i.nivel}` : "Academia"}
            </span>
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-stone-900/5 dark:bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-stone-800 dark:text-amber-100">
              <Award className="w-3 h-3" /> {i.nota}
              {medalla ? ` · ${NOMBRE_MEDALLA[medalla].replace("Medalla de ", "")}` : ""}
            </span>
            {(fecha(i.fecha) || DE_VIA[i.via]) && (
              <span className="block text-[10px] text-stone-500 dark:text-stone-400 mt-1">{[DE_VIA[i.via], fecha(i.fecha)].filter(Boolean).join(" · ")}</span>
            )}
          </figcaption>
        </div>
      </div>
    </motion.figure>
  );
}

/** La vitrina: todas las insignias del alumno, de a dos por fila en el teléfono. */
export function VitrinaInsignias({ insignias, propio = true }: { insignias: InsigniaMateria[]; propio?: boolean }) {
  return (
    <section className="mb-8" data-testid="vitrina-insignias">
      <div className="flex items-end justify-between gap-3 mb-1">
        <h2 className="font-display text-2xl font-bold">{propio ? "Mi vitrina" : "Su vitrina"}</h2>
        <span className="text-sm font-semibold text-muted-foreground">{insignias.length} {insignias.length === 1 ? "insignia" : "insignias"}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Cada materia aprobada deja su insignia, con la nota y la medalla. Los certificados quedan para los logros mayores: el nivel completo, la especialidad y la graduación.
      </p>
      {insignias.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
          {propio ? "Cuando apruebes tu primera materia, su insignia aparecerá aquí." : "Todavía no aprobó ninguna materia."}
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {insignias.map((i, k) => (
            <InsigniaEnmarcada key={i.materiaId} i={i} indice={k} />
          ))}
        </div>
      )}
    </section>
  );
}

/** Las insignias que salen de las materias aprobadas de un expediente. */
export function insigniasDe(materias: { id: string; titulo: string; nivel: number | null; estado: string; nota: number | null; aprobada: string | null }[], especialidades?: Record<string, string>): InsigniaMateria[] {
  return materias
    .filter((m) => m.estado === "aprobada" && m.nota != null)
    .sort((a, b) => (a.aprobada ?? "").localeCompare(b.aprobada ?? ""))
    .map((m) => ({ materiaId: m.id, titulo: m.titulo, nivel: m.nivel, especialidad: especialidades?.[m.id] ?? null, nota: m.nota!, medalla: medallaDe(m.nota!), fecha: m.aprobada, via: "cursada" }));
}
