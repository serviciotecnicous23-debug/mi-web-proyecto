/**
 * La ventana de un personaje de la calle de los siervos (shared/personajes.ts): su retrato y su saludo, un chisme
 * (de la Escritura, con su cita, o de lo que está pasando en el juego) y el recado del día, que lleva de una casa a
 * otra. El servidor corrige: el recado avanza solo si estás junto a la puerta de quien toca.
 */
import { useContext, useEffect, useState } from "react";
import { Footprints, Loader2, MessageCircle, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CiudadCtx } from "./CiudadUI";
import { Portrait } from "./Portrait";
import { gameStore } from "./store";
import { avisarRacha } from "./online";
import { Card, VerseBox } from "./ui";
import { PERSONAJES_CIUDAD, personajeCiudad, type Chisme, type ChismesVista, type RecadoEstado } from "@shared/personajes";

const API = "/api/jerusalen";

async function pedir<T>(ruta: string, body?: unknown): Promise<{ ok: boolean; status: number; data: (T & { message?: string }) | null }> {
  try {
    const r = await fetch(`${API}${ruta}`, {
      method: body === undefined ? "GET" : "POST",
      credentials: "include",
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return { ok: r.ok, status: r.status, data: (await r.json().catch(() => null)) as (T & { message?: string }) | null };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}

const nombre = (id: string) => personajeCiudad(id)?.nombre ?? id;

export function PersonajeView({ id }: { id: string }) {
  const { city } = useContext(CiudadCtx);
  const p = personajeCiudad(id);
  const [recado, setRecado] = useState<RecadoEstado | null>(null);
  const [noticias, setNoticias] = useState<string[]>([]);
  const [chismeI, setChismeI] = useState(() => Math.floor(Math.random() * 100));
  const [dice, setDice] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [ocupado, setOcupado] = useState(false);

  useEffect(() => {
    let vivo = true;
    void pedir<{ estado: RecadoEstado }>("/recado").then((r) => vivo && r.ok && r.data && setRecado(r.data.estado));
    void pedir<ChismesVista>("/chismes").then((r) => vivo && r.ok && r.data && setNoticias(r.data.noticias));
    return () => {
      vivo = false;
    };
  }, []);

  if (!p) return null;
  const chismes: Chisme[] = [...p.chismes, ...noticias.map((texto) => ({ texto }))];
  const chisme = chismes[chismeI % chismes.length];
  const toca = recado && !recado.hecho ? recado.recado.cadena[recado.paso] : null;

  async function hablar() {
    if (!p) return;
    setOcupado(true);
    setAviso(null);
    const r = await pedir<{ estado: RecadoEstado; dice: string; fin: boolean; gozoTotal?: number; racha?: { titulo: string; gozo: number } | null }>("/recado/hablar", { con: p.id });
    setOcupado(false);
    if (!r.ok || !r.data) {
      setAviso(r.data?.message || "No se pudo. Revisa tu conexión.");
      return;
    }
    setRecado(r.data.estado);
    setDice(r.data.dice);
    city?.audio.click();
    if (r.data.fin) {
      gameStore.toast(`📜 Recado cumplido: ${r.data.estado.recado.titulo} (+${r.data.estado.premio.merito} de mérito, +${r.data.estado.premio.gozo} de gozo)`, "gold");
      if (r.data.racha) {
        gameStore.toast(`${r.data.racha.titulo} · +${r.data.racha.gozo} de gozo`, "gold");
        avisarRacha();
      }
      if (r.data.gozoTotal != null) city?.ponerGozo(r.data.gozoTotal);
    }
  }

  function irA(otro: string) {
    // se cierra esta charla y la ciudad lleva a la puerta del otro y abre la suya
    gameStore.close();
    setTimeout(() => city?.irAPersonaje(otro), 60);
  }

  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" /> La casa de {p.nombre}
        </span>
      }
      onClose={() => gameStore.close()}
      testid="ciudad-personaje"
    >
      <div className="space-y-3 p-4 text-sm">
        <div className="flex items-start gap-3">
          <Portrait who={p.retrato as Parameters<typeof Portrait>[0]["who"]} size={64} />
          <div className="min-w-0">
            <p className="font-black">{p.nombre}</p>
            <p className="text-[11px] text-stone-500">
              {p.titulo} · de día está {p.trabajo}
            </p>
            <p className="mt-1.5 rounded-2xl rounded-tl-sm bg-amber-50 px-3 py-2 font-serif italic text-amber-950 dark:bg-amber-950/30 dark:text-amber-100" data-testid="personaje-dice">
              «{dice ?? p.saludo}»
            </p>
          </div>
        </div>

        <section className="space-y-2 rounded-xl border border-stone-200 p-3 dark:border-stone-700" data-testid="personaje-chisme">
          <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Lo que se cuenta</p>
          <p className="leading-snug">{chisme.texto}</p>
          {chisme.verso && <VerseBox text={chisme.verso.text} refName={chisme.verso.ref} />}
          <button type="button" className="text-xs font-bold text-amber-700 underline-offset-2 hover:underline dark:text-amber-300" onClick={() => setChismeI((i) => i + 1)} data-testid="personaje-otro-chisme">
            ¿Y qué más se cuenta?
          </button>
        </section>

        <section className="space-y-2 rounded-xl bg-stone-50 p-3 dark:bg-stone-800/50" data-testid="personaje-recado">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-500">
            <ScrollText className="h-3.5 w-3.5" /> El recado de hoy
          </p>
          {!recado ? (
            <Loader2 className="h-4 w-4 animate-spin text-amber-600" />
          ) : recado.hecho ? (
            <p className="text-emerald-700 dark:text-emerald-300">✓ Ya cumpliste el recado de hoy: «{recado.recado.titulo}». Mañana habrá otro.</p>
          ) : toca === p.id ? (
            <>
              <p className="leading-snug">
                {recado.paso === 0 ? (
                  <>
                    <b>{p.nombre}</b> tiene un encargo para ti: <b>{recado.recado.titulo}</b>.
                  </>
                ) : (
                  <>
                    Traes <b>{recado.recado.lleva[recado.paso - 1]}</b> para {p.nombre}.
                  </>
                )}
              </p>
              <Button className="w-full" disabled={ocupado} onClick={() => void hablar()} data-testid="personaje-recado-hablar">
                {ocupado ? <Loader2 className="h-4 w-4 animate-spin" /> : recado.paso === 0 ? "Recibir el encargo" : "Entregarlo"}
              </Button>
            </>
          ) : (
            <>
              <p className="leading-snug">
                {recado.paso === 0 ? (
                  <>
                    Hoy <b>{nombre(toca!)}</b> tiene un recado para ti: <b>{recado.recado.titulo}</b>.
                  </>
                ) : (
                  <>
                    Llevas <b>{recado.recado.lleva[recado.paso - 1]}</b> para <b>{nombre(toca!)}</b> (paso {recado.paso + 1} de 3).
                  </>
                )}
              </p>
              <Button variant="secondary" className="w-full" onClick={() => irA(toca!)} data-testid="personaje-recado-ir">
                <Footprints className="mr-1.5 h-4 w-4" /> Ir a la casa de {nombre(toca!)}
              </Button>
            </>
          )}
          {recado && !recado.hecho && (
            <p className="text-[11px] text-stone-500">
              Al cumplirlo: +{recado.premio.merito} de mérito y +{recado.premio.gozo} de gozo. Se lleva de casa en casa: {recado.recado.cadena.map(nombre).join(" → ")}.
            </p>
          )}
          {aviso && <p className="rounded-lg bg-amber-100 px-2 py-1 text-xs text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">{aviso}</p>}
        </section>

        <p className="text-center text-[11px] text-stone-500">
          En la calle de los siervos viven {PERSONAJES_CIUDAD.map((x) => x.nombre).join(", ")}. Cada uno sabe algo distinto.
        </p>
      </div>
    </Card>
  );
}
