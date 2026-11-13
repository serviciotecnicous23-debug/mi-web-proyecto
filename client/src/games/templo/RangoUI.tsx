/**
 * Los exámenes de rango en la pantalla (shared/examenes-rango.ts): la sección del menú del aula con los cuatro exámenes
 * del camino, sus partes (cada una cuando uno quiere, o todas de corrido), el repaso de la temporada, la prenda y lo que
 * abre cada uno; y el aviso de lo que falta, para la ventana de la temporada y «Para hoy».
 */
import { useEffect, useState } from "react";
import { Check, ChevronDown, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { aulaDeCamino } from "@shared/aula";
import type { ExamenVista, ParteVista, RangoEstado } from "@shared/examenes-rango";
import type { PedidoAula } from "./aula/clases";
import { gameStore } from "./store";
import { Ico } from "./iconos";

async function traerRango(): Promise<RangoEstado | null> {
  try {
    const r = await fetch("/api/jerusalen/rango", { credentials: "include", cache: "no-store" });
    return r.ok ? ((await r.json()) as RangoEstado) : null;
  } catch {
    return null;
  }
}

/** Lo que le falta a quien juega (el examen o el repaso), para los avisos. */
export function useRangoFalta(): RangoEstado | null {
  const [r, setR] = useState<RangoEstado | null>(null);
  useEffect(() => {
    let vivo = true;
    void traerRango().then((x) => vivo && setR(x));
    return () => {
      vivo = false;
    };
  }, []);
  return r;
}

/** Ir al aula del camino (cierra la ventana que está abierta). */
export function irAlAulaDeRango(r: RangoEstado) {
  gameStore.close();
  gameStore.push({ kind: "aula", aula: aulaDeCamino(r.camino) });
}

/** El aviso de lo que falta (en la ventana de la temporada). */
export function RangoAviso() {
  const r = useRangoFalta();
  if (!r?.falta) return null;
  return (
    <div className="mb-3 flex items-center gap-3 rounded-2xl border border-violet-300 bg-violet-50 p-3 text-left text-sm dark:border-violet-800 dark:bg-violet-950/30" data-testid="rango-aviso">
      <span className="text-2xl"><Ico e="🎖️" /></span>
      <span className="min-w-0 flex-1">
        <span className="block font-black">Exámenes de rango</span>
        <span className="block text-xs text-stone-700 dark:text-stone-300">{r.falta.texto} Se dan por partes en el aula, cuando quieras.</span>
      </span>
      <Button size="sm" onClick={() => irAlAulaDeRango(r)} data-testid="rango-aviso-ir">
        Al aula
      </Button>
    </div>
  );
}

const minutos = (s: number) => (s > 90 ? `${Math.ceil(s / 60)} min` : `${s} s`);

function botonParte(p: ParteVista): { texto: string; puede: boolean } {
  if (p.aprobada) return { texto: "✓ Aprobada", puede: false };
  if (p.enCurso) return { texto: `Seguir (${p.enCurso.i + 1} de ${p.enCurso.de})`, puede: true };
  if (p.espera > 0) return { texto: `En ${minutos(p.espera)}`, puede: false };
  return { texto: p.intentos ? "Otra vez ▸" : "A clase ▸", puede: true };
}

/** La sección «Exámenes de rango» del menú del aula. */
export function MenuRango({ rango, abrir }: { rango: RangoEstado; abrir: (p: PedidoAula) => void }) {
  const primero = rango.examenes.find((e) => e.abierto && !e.aprobado)?.id ?? null;
  const [abierto, setAbierto] = useState<string | null>(primero);
  // al aprobar un examen se pliega y se abre el que sigue
  useEffect(() => setAbierto(primero), [primero]);
  const rp = rango.repaso;
  return (
    <div className="space-y-1.5" data-testid="aula-rango">
      <p className="px-1 text-[11px] font-black uppercase tracking-[0.14em] text-amber-200/90"><Ico e="🎖️" /> Exámenes de rango</p>
      {rango.falta && (
        <p className="rounded-xl bg-amber-100/95 px-3 py-1.5 text-[12px] font-semibold leading-snug text-[#5a3a1a]" data-testid="aula-rango-falta">
          {rango.falta.texto}
        </p>
      )}
      {rp && (
        <div className="aula-tarjeta flex items-center gap-3" data-testid="aula-repaso">
          <span className="text-2xl">🔁</span>
          <span className="min-w-0 flex-1">
            <span className="block font-serif text-[15px] font-black text-[#2a1a10]">El repaso de la temporada {rp.temporada}</span>
            <span className="block text-[11.5px] font-semibold text-[#6b4a2a]">
              {rp.aprobado ? "✓ Aprobado: tu cargo alto sigue al día." : rp.necesario ? `Para seguir en un cargo alto: ${rp.preguntas} preguntas, se aprueba con ${rp.aprueba}.` : "Esta temporada no te hace falta (aprobaste tu examen en ella)."}
            </span>
          </span>
          {!rp.aprobado && rp.necesario && (
            <button type="button" className="aula-boton-oro shrink-0" disabled={rp.espera > 0} onClick={() => abrir({ que: "repaso" })} data-testid="aula-repaso-dar">
              {rp.enCurso ? "Seguir" : rp.espera > 0 ? `En ${minutos(rp.espera)}` : "Dar el repaso"}
            </button>
          )}
        </div>
      )}
      {rango.examenes.map((e) => (
        <ExamenTarjeta key={e.id} e={e} ver={abierto === e.id} alternar={() => setAbierto(abierto === e.id ? null : e.id)} abrir={abrir} />
      ))}
    </div>
  );
}

function ExamenTarjeta({ e, ver, alternar, abrir }: { e: ExamenVista; ver: boolean; alternar: () => void; abrir: (p: PedidoAula) => void }) {
  const hechas = e.partes.filter((p) => p.aprobada).length;
  const pendientes = e.partes.filter((p) => !p.aprobada);
  const libre = pendientes.find((p) => botonParte(p).puede);
  // de corrido: todas las que faltan, una tras otra (sin obligar: también se pueden dar de a una)
  const corrido = e.abierto && !e.aprobado && pendientes.length > 1 && pendientes.every((p) => !p.intentos && p.espera === 0);
  return (
    <div className="aula-tarjeta" data-testid={`aula-rango-${e.id}`}>
      <button type="button" className="flex w-full items-center gap-3 text-left" onClick={alternar} aria-expanded={ver}>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg" style={{ background: e.prenda.color, color: "#fff" }}>
          {e.escalon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-serif text-[15px] font-black leading-tight text-[#2a1a10]">{e.nombre}</span>
          <span className="block text-[11.5px] font-semibold text-[#6b4a2a]">
            {e.aprobado ? `✓ Aprobado el ${e.aprobado}${e.deCorrido ? " · ⭐ de corrido" : ""}` : !e.abierto ? `🔒 ${e.porQue}` : `${hechas} de ${e.partes.length} partes`}
          </span>
        </span>
        {!e.abierto ? <Lock className="h-4 w-4 shrink-0 text-[#8a6a4a]" /> : e.aprobado ? <Check className="h-5 w-5 shrink-0 text-emerald-700" /> : <ChevronDown className={`h-4 w-4 shrink-0 text-[#8a6a4a] transition ${ver ? "rotate-180" : ""}`} />}
      </button>
      {ver && (
        <div className="mt-2 space-y-1.5 border-t border-[#8f2a17]/20 pt-2">
          {e.partes.map((p) => {
            const b = botonParte(p);
            return (
              <button
                key={p.n}
                type="button"
                disabled={!e.abierto || !b.puede}
                onClick={() => abrir({ que: "rango", examen: e.id, parte: p.n })}
                className="flex w-full items-center gap-2.5 rounded-xl bg-white/45 px-2.5 py-1.5 text-left hover:bg-white/70 disabled:opacity-70"
                data-testid={`aula-rango-parte-${e.id}-${p.n}`}
              >
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-black ${p.aprobada ? "bg-emerald-600 text-white" : "bg-[#8f2a17] text-amber-50"}`}>{p.aprobada ? <Check className="h-3.5 w-3.5" /> : p.n}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-bold text-[#2a1a10]">{p.titulo}</span>
                  <span className="block text-[11px] text-[#6b4a2a]">
                    {p.preguntas} preguntas · se aprueba con {p.aprueba}
                    {p.mejor && !p.aprobada ? ` · tu mejor: ${p.mejor}` : ""}
                  </span>
                </span>
                <span className="shrink-0 text-[11px] font-black text-[#8f2a17]">{b.texto}</span>
              </button>
            );
          })}
          {corrido && (
            <button type="button" className="aula-boton-oro w-full" onClick={() => abrir({ que: "rango", examen: e.id, parte: pendientes[0].n, corrido: true })} data-testid={`aula-rango-corrido-${e.id}`}>
              🏃 Darlo todo de corrido (o elige una parte)
            </button>
          )}
          {!corrido && libre && !e.aprobado && e.abierto && pendientes.length > 1 && (
            <p className="text-center text-[11px] text-[#6b4a2a]">Cada parte queda guardada: sigue cuando quieras.</p>
          )}
          <p className="flex items-center gap-2 text-[12px] text-[#5a3a1a]">
            <span className="inline-block h-4 w-4 shrink-0 rounded-full border border-black/20" style={{ background: e.prenda.color }} />
            <span>
              {e.aprobado ? "Te dio" : "Al aprobarlo"}: <b>{e.prenda.nombre}</b> · {e.abre.filter((x) => !x.startsWith("La prenda")).join(" · ")}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
