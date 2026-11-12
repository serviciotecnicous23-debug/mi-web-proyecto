/**
 * El álbum en la pantalla (shared/album.ts, server/album.ts): las colecciones con lo que tienes (o tuviste) y lo que te
 * falta, y los títulos ganados; el que elijas lo ven tus vecinos junto a tu nombre.
 */
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { articulo } from "@shared/mercado";
import { COLECCIONES, EN_EL_ALBUM, TITULOS_ESPECIALES, VERSO_ALBUM, nombreDeTitulo, type AlbumEstado, type TituloId } from "@shared/album";
import { gameStore } from "./store";
import { VerseBox } from "./ui";

type Resp = AlbumEstado & { message?: string };
async function pedir(path: string, body?: unknown): Promise<{ ok: boolean; data: Resp | null }> {
  try {
    const res = await fetch(`/api/jerusalen${path}`, {
      method: body === undefined ? "GET" : "POST",
      credentials: "include",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return { ok: res.ok, data: (await res.json().catch(() => null)) as Resp | null };
  } catch {
    return { ok: false, data: null };
  }
}

export function AlbumView() {
  const [a, setA] = useState<AlbumEstado | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [abierta, setAbierta] = useState<string | null>(null);
  useEffect(() => {
    void pedir("/album").then((r) => {
      if (r.ok && r.data) setA(r.data);
      else setError(r.data?.message || "No se pudo abrir el álbum.");
    });
  }, []);
  const elegir = async (titulo: TituloId | null) => {
    setBusy(true);
    setError(null);
    const r = await pedir("/album/titulo", { titulo });
    setBusy(false);
    if (r.ok && r.data) {
      setA(r.data);
      gameStore.toast(titulo ? `Ahora tus vecinos ven tu título: «${nombreDeTitulo(titulo)}».` : "Ya no muestras ningún título.", "gold");
    } else setError(r.data?.message || "No se pudo cambiar el título.");
  };
  if (!a) return error ? <p className="rounded-lg bg-rose-50 p-2 text-xs text-rose-800 dark:bg-rose-950/40 dark:text-rose-200">{error}</p> : <Loader2 className="mx-auto h-5 w-5 animate-spin" />;
  const tengo = new Set(a.tengo);
  const total = a.tengo.filter((i) => EN_EL_ALBUM.has(i)).length;
  const ganados = new Set<string>(a.titulos);
  const todos: { id: TituloId; titulo: string; como: string }[] = [
    ...COLECCIONES.map((c) => ({ id: c.id as TituloId, titulo: c.titulo, como: `Completa «${c.nombre.toLowerCase()}».` })),
    ...TITULOS_ESPECIALES,
  ];
  return (
    <div className="space-y-3" data-testid="album">
      <p className="rounded-xl bg-amber-50/70 p-2.5 text-[13px] dark:bg-amber-950/20">
        📚 <b>Tu álbum</b>: todo lo que tuviste alguna vez queda aquí, aunque lo vendas o lo regales. Llevas <b data-testid="album-total">{total}</b> de {EN_EL_ALBUM.size} cosas.
      </p>
      {error && <p className="rounded-lg bg-rose-50 p-2 text-xs text-rose-800 dark:bg-rose-950/40 dark:text-rose-200">{error}</p>}
      <section className="space-y-1.5" data-testid="album-titulos">
        <p className="font-black">🏅 Tus títulos {a.titulo && <span className="ml-1 rounded-full bg-amber-200 px-2 py-0.5 text-[11px] text-amber-950">muestras: {nombreDeTitulo(a.titulo)}</span>}</p>
        <div className="flex flex-wrap gap-1.5">
          {todos.map((t) => {
            const g = ganados.has(t.id);
            const usado = a.titulo === t.id;
            return (
              <button
                key={t.id}
                type="button"
                disabled={!g || busy}
                aria-pressed={usado}
                onClick={() => void elegir(usado ? null : t.id)}
                title={g ? (usado ? "Dejar de mostrarlo" : "Mostrar este título") : t.como}
                className={`rounded-full px-2.5 py-1 text-xs font-bold ${usado ? "bg-amber-500 text-amber-950 ring-2 ring-amber-300" : g ? "bg-amber-100 text-amber-950 dark:bg-amber-900/40 dark:text-amber-100" : "bg-stone-100 text-stone-400 dark:bg-stone-800"}`}
                data-testid={`album-titulo-${t.id}`}
              >
                {g ? "🏅" : "🔒"} {t.titulo}
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-stone-500">Toca un título ganado para mostrarlo; los que tienen 🔒 dicen cómo se ganan.</p>
      </section>
      {COLECCIONES.map((c) => {
        const n = c.items.filter((i) => tengo.has(i)).length;
        const completa = n === c.items.length;
        const abierto = abierta === c.id;
        return (
          <section key={c.id} className={`rounded-xl border p-2.5 ${completa ? "border-amber-400 bg-amber-50/60 dark:border-amber-700 dark:bg-amber-950/20" : "border-stone-200 dark:border-stone-700"}`} data-testid={`album-${c.id}`}>
            <button type="button" className="flex w-full items-center gap-2 text-left" onClick={() => setAbierta(abierto ? null : c.id)} aria-expanded={abierto}>
              <span className="text-xl">{c.icono}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold">
                  {c.nombre} {completa && <span className="text-[11px] text-amber-700 dark:text-amber-300">· 🏅 {c.titulo}</span>}
                </span>
                <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700">
                  <span className="block h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600" style={{ width: `${Math.round((n / Math.max(1, c.items.length)) * 100)}%` }} />
                </span>
              </span>
              <span className="shrink-0 text-xs font-black tabular-nums">
                {n}/{c.items.length}
              </span>
            </button>
            {abierto && (
              <div className="mt-2 space-y-1.5">
                <p className="text-[11px] text-stone-500">{c.texto}</p>
                <div className="flex flex-wrap gap-1">
                  {c.items.map((id) => {
                    const ar = articulo(id);
                    const si = tengo.has(id);
                    return (
                      <span key={id} className={`rounded-lg px-1.5 py-0.5 text-[11px] ${si ? "bg-white font-semibold ring-1 ring-amber-300 dark:bg-stone-900 dark:ring-amber-800" : "bg-stone-100 text-stone-400 dark:bg-stone-800"}`} title={ar?.detalle}>
                        {si ? ar?.icono : "❔"} {ar?.nombre ?? id}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        );
      })}
      <VerseBox text={VERSO_ALBUM.text} refName={VERSO_ALBUM.ref} />
      {a.titulo && (
        <Button size="sm" variant="ghost" disabled={busy} onClick={() => void elegir(null)}>
          No mostrar ningún título
        </Button>
      )}
    </div>
  );
}
