/**
 * Las obras de tu casa y sus estrellas (shared/obras.ts, server/obras.ts): con el gozo que ganas sirviendo y
 * estudiando, edificas tu casa. Una obra a la vez; se paga con gozo y con flor de harina del alfolí (el pan de los
 * obreros) y tarda unas horas. Lo edificado lo ven los vecinos y casi todo sirve para algo.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { Hammer, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ESTRELLAS_PUNTOS, GRUPOS_OBRA, MAS_OBREROS, OBRAS, VERSO_HARINA, VERSO_OBRAS, costoDeObra, obra,
  type EstrellasCasa, type GrupoObra, type ObraId, type ObrasEstado,
} from "@shared/obras";
import { mueble } from "@shared/casa-interior";
import { gameStore } from "./store";
import { VerseBox } from "./ui";
import { Gozo, Ico } from "./iconos";

type Respuesta = ObrasEstado & { message?: string; empezada?: ObraId; costo?: number };

async function pedir(body?: unknown): Promise<{ ok: boolean; data: Respuesta | null }> {
  try {
    const res = await fetch("/api/jerusalen/casa/obras", {
      method: body === undefined ? "GET" : "POST",
      credentials: "include",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return { ok: res.ok, data: (await res.json().catch(() => null)) as Respuesta | null };
  } catch {
    return { ok: false, data: null };
  }
}

function horas(h: number): string {
  if (h < 1) return `${Math.round(h * 60)} min`;
  return Number.isInteger(h) ? `${h} h` : `${Math.floor(h)} h ${Math.round((h % 1) * 60)} min`;
}
function falta(s: number): string {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60;
  if (h) return `${h} h ${m} min`;
  if (m) return `${m} min ${x} s`;
  return `${x} s`;
}
const minuscula = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);

/** Las estrellas: ★★★☆☆ (con la etiqueta para quien no ve). */
export function Estrellas({ n, className = "" }: { n: number; className?: string }) {
  const e = Math.max(1, Math.min(5, Math.round(n)));
  return (
    <span className={`tracking-tight text-amber-500 ${className}`} role="img" aria-label={`${e} de 5 estrellas`} data-testid="estrellas">
      {"★".repeat(e)}
      <span className="text-stone-300 dark:text-stone-600">{"★".repeat(5 - e)}</span>
    </span>
  );
}

/** Lo que suma cada parte de la casa y los juegos de muebles (la ficha de las estrellas). */
export function FichaEstrellas({ e }: { e: EstrellasCasa }) {
  const pct = e.faltan === null ? 100 : Math.round(((e.puntos - ESTRELLAS_PUNTOS[e.estrellas - 1]) / (ESTRELLAS_PUNTOS[e.estrellas] - ESTRELLAS_PUNTOS[e.estrellas - 1])) * 100);
  return (
    <div className="space-y-2 rounded-xl border border-amber-200 bg-amber-50/60 p-3 dark:border-amber-900/60 dark:bg-amber-950/20" data-testid="obras-estrellas">
      <p className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-black">
          <Estrellas n={e.estrellas} className="text-xl" /> <span className="ml-1">{e.estrellas} {e.estrellas === 1 ? "estrella" : "estrellas"}</span>
        </span>
        <span className="text-xs font-semibold tabular-nums text-amber-800 dark:text-amber-300">{e.puntos} puntos</span>
      </p>
      <div className="h-2 overflow-hidden rounded-full bg-amber-100 dark:bg-amber-950/50">
        <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600" style={{ width: `${Math.max(3, Math.min(100, pct))}%` }} />
      </div>
      <p className="text-xs text-stone-600 dark:text-stone-300">
        {e.faltan === null ? "¡Tu casa tiene las cinco estrellas! Los vecinos la ven en su letrero." : `Te faltan ${e.faltan} puntos para la ${e.estrellas + 1}.ª estrella. Las ven tus vecinos.`}
      </p>
      {e.partes.length > 0 && (
        <ul className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[11px] text-stone-600 dark:text-stone-300">
          {e.partes.map((p) => (
            <li key={p.texto} className="flex justify-between gap-2">
              <span>{p.texto}</span>
              <b className="tabular-nums">+{p.puntos}</b>
            </li>
          ))}
        </ul>
      )}
      <details className="text-[11px]">
        <summary className="cursor-pointer font-bold text-amber-800 dark:text-amber-300">Juegos de muebles (+10 cada uno completo dentro de tu casa)</summary>
        <ul className="mt-1 space-y-0.5">
          {e.juegos.map((j) => (
            <li key={j.id} className={j.completo ? "font-bold text-emerald-700 dark:text-emerald-300" : "text-stone-600 dark:text-stone-300"}>
              {j.icono} {j.nombre}: {j.completo ? "✓ completo" : `faltan ${j.faltan.map((m) => minuscula(mueble(m)?.nombre ?? m)).join(", ")}`}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}

/** La pestaña «Obras» de tu casa. `alCambiar` avisa a la ciudad (lo edificado se ve y el gozo baja). */
export function ObrasCasa({ alCambiar }: { alCambiar?: (o: ObrasEstado) => void }) {
  const [o, setO] = useState<ObrasEstado | null>(null);
  const [recibido, setRecibido] = useState(() => Date.now());
  const [ahora, setAhora] = useState(() => Date.now());
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const aviso = useRef(alCambiar);
  aviso.current = alCambiar;
  const recibir = useCallback((d: ObrasEstado) => {
    setO(d);
    setRecibido(Date.now());
    aviso.current?.(d);
    if (d.terminada) {
      const ob = obra(d.terminada);
      if (ob) gameStore.toast(`${ob.icono} ¡Terminaron tu obra: ${minuscula(ob.nombre)}! Tus vecinos ya la ven.`, "gold");
    }
  }, []);
  const cargar = useCallback(async () => {
    const r = await pedir();
    if (r.ok && r.data) recibir(r.data);
    else setError(r.data?.message || "No se pudo abrir. Revisa tu conexión.");
  }, [recibir]);
  useEffect(() => {
    void cargar();
  }, [cargar]);
  // el reloj de la obra (y al terminar, se pide otra vez: el servidor la asienta)
  const faltan = o?.curso ? Math.max(0, o.curso.faltan - Math.floor((ahora - recibido) / 1000)) : 0;
  useEffect(() => {
    if (!o?.curso) return;
    const t = setInterval(() => setAhora(Date.now()), 1000);
    return () => clearInterval(t);
  }, [o?.curso]);
  const pedido = useRef(false);
  useEffect(() => {
    if (o?.curso && faltan === 0 && !pedido.current) {
      pedido.current = true;
      void cargar().finally(() => {
        pedido.current = false;
      });
    }
  }, [o?.curso, faltan, cargar]);

  const edificar = async (id: ObraId, rapido: boolean) => {
    setBusy(true);
    setError(null);
    const r = await pedir({ obra: id, rapido });
    setBusy(false);
    if (r.ok && r.data) {
      recibir(r.data);
      const ob = obra(id)!;
      gameStore.toast(`🔨 Los obreros empezaron: ${minuscula(ob.nombre)}. Estará en ${horas(costoDeObra(ob, rapido).horas)}.`, "gold");
    } else setError(r.data?.message || "No se pudo empezar la obra.");
  };

  if (!o) {
    return error ? (
      <p className="rounded-lg bg-rose-50 p-2 text-sm text-rose-800 dark:bg-rose-950/40 dark:text-rose-200">{error}</p>
    ) : (
      <p className="flex items-center gap-2 text-sm text-stone-500">
        <Loader2 className="h-4 w-4 animate-spin" /> Abriendo las obras de tu casa…
      </p>
    );
  }
  const enObra = o.curso ? obra(o.curso.id) : null;
  return (
    <div className="space-y-3" data-testid="obras-casa">
      <FichaEstrellas e={o.estrellas} />
      {enObra && o.curso && (
        <div className="space-y-1.5 rounded-xl border border-orange-300 bg-orange-50/70 p-3 dark:border-orange-900/60 dark:bg-orange-950/20" data-testid="obras-en-curso">
          <p className="flex items-center gap-2 font-black">
            <Hammer className="h-4 w-4" /> En obra: <Ico e={enObra.icono ?? ""} /> {enObra.nombre}
            {o.curso.rapido && <span className="rounded-full bg-orange-200 px-2 py-0.5 text-[10px] font-bold text-orange-900">con más obreros</span>}
          </p>
          <div className="h-2.5 overflow-hidden rounded-full bg-orange-100 dark:bg-orange-950/50">
            <div className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-600 transition-[width] duration-1000" style={{ width: `${Math.round(((o.curso.total - faltan) / Math.max(1, o.curso.total)) * 100)}%` }} />
          </div>
          <p className="text-xs">{faltan > 0 ? `Falta ${falta(faltan)}. Puedes seguir jugando: los obreros trabajan aunque no estés.` : "¡Terminada! Mirando la obra…"}</p>
        </div>
      )}
      <p className="flex flex-wrap gap-x-3 gap-y-1 rounded-lg bg-stone-100 px-3 py-2 text-xs font-semibold dark:bg-stone-800" data-testid="obras-tienes">
        <span>Tienes: <Gozo n={o.gozo} /> de gozo</span>
        <span><Ico e="🌾" /> {o.harina} de flor de harina</span>
        <span><Ico e="🫒" /> {o.aceite} de aceite</span>
        <span><Ico e="📚" /> {o.estudios} {o.estudios === 1 ? "estudio aprobado" : "estudios aprobados"}</span>
      </p>
      {error && <p className="rounded-lg bg-rose-50 p-2 text-xs text-rose-800 dark:bg-rose-950/40 dark:text-rose-200" data-testid="obras-error">{error}</p>}
      {(["patio", "casa", "fina"] as GrupoObra[]).map((g) => (
        <section key={g} className="space-y-1.5">
          <h3 className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
            <Ico e={GRUPOS_OBRA[g].icono ?? ""} /> {GRUPOS_OBRA[g].nombre} <span className="font-semibold normal-case tracking-normal text-stone-500">· {GRUPOS_OBRA[g].texto}</span>
          </h3>
          {OBRAS.filter((ob) => ob.grupo === g).map((ob) => {
            const v = o.obras.find((x) => x.id === ob.id)!;
            const c = costoDeObra(ob), cr = costoDeObra(ob, true);
            const faltaAlfoli = o.harina < c.harina || o.aceite < c.aceite;
            const puede = v.estado === "se-puede";
            return (
              <div
                key={ob.id}
                className={`rounded-xl border p-2.5 ${v.estado === "hecha" ? "border-emerald-300 bg-emerald-50/60 dark:border-emerald-900/60 dark:bg-emerald-950/20" : "border-stone-200 dark:border-stone-700"}`}
                data-testid={`obra-${ob.id}`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-2xl leading-none"><Ico e={ob.icono ?? ""} /></span>
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-baseline justify-between gap-x-2 font-bold">
                      <span>{ob.nombre}</span>
                      <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300">+{ob.puntos} a las estrellas</span>
                    </p>
                    <p className="text-xs text-stone-600 dark:text-stone-300">{ob.detalle}</p>
                    {ob.ventaja && <p className="mt-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">✓ {ob.ventaja}</p>}
                    <p className="mt-0.5 text-[11px] text-stone-500">
                      <Gozo n={c.gozo} /> de gozo · 🌾 {c.harina} de harina{c.aceite ? ` · 🫒 ${c.aceite} de aceite` : ""} · ⏳ {horas(c.horas)}
                    </p>
                    <p className="mt-0.5 text-[11px] italic text-stone-500">
                      «{ob.verso.text}» ({ob.verso.ref})
                    </p>
                  </div>
                </div>
                {v.estado === "hecha" ? (
                  <p className="mt-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">✓ Edificada: la ven tus vecinos.</p>
                ) : v.estado === "en-obra" ? (
                  <p className="mt-1.5 text-xs font-bold text-orange-700 dark:text-orange-300"><Ico e="🔨" /> En obra</p>
                ) : v.estado === "bloqueada" ? (
                  <p className="mt-1.5 text-xs text-stone-500">🔒 {v.motivo}</p>
                ) : (
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    <Button size="sm" disabled={busy || !puede || o.gozo < c.gozo || faltaAlfoli} onClick={() => void edificar(ob.id, false)} data-testid={`obra-edificar-${ob.id}`}>
                      Edificar · {c.gozo}
                    </Button>
                    <Button size="sm" variant="secondary" disabled={busy || !puede || o.gozo < cr.gozo || faltaAlfoli} onClick={() => void edificar(ob.id, true)} data-testid={`obra-rapido-${ob.id}`}>
                      Con más obreros · {cr.gozo} ({horas(cr.horas)})
                    </Button>
                    {o.gozo < c.gozo ? (
                      <span className="self-center text-[11px] text-stone-500">Te faltan {c.gozo - o.gozo} de gozo.</span>
                    ) : faltaAlfoli ? (
                      <span className="self-center text-[11px] text-stone-500">Falta harina o aceite en tu alfolí para el pan de los obreros.</span>
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      ))}
      <VerseBox text={VERSO_HARINA.text} refName={VERSO_HARINA.ref} />
      <p className="text-[11px] text-stone-500">
        Con más obreros la obra cuesta la mitad más de gozo y termina en la mitad del tiempo («{MAS_OBREROS.verso.text}», {MAS_OBREROS.verso.ref}). El 10 % de cada obra va al tesoro del templo, que ayuda a los que recién llegan.
      </p>
      <VerseBox text={VERSO_OBRAS.text} refName={VERSO_OBRAS.ref} />
    </div>
  );
}
