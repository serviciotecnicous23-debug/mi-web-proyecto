/**
 * Invita a un amigo en la pantalla (shared/invitar.ts, server/invitar.ts): tu código y tu enlace para compartir, tus
 * amigos invitados con sus días, y el código de quien te invitó. Quien entra por un enlace con `?invita=` lo guarda en el
 * teléfono y, al entrar a Jerusalén, se usa solo.
 */
import { useEffect, useState } from "react";
import { Copy, Loader2, Share2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { INVITAR, VERSO_AMIGO, VERSO_INVITAR, enlaceDeInvitacion, normalizarCodigo, type InvitarEstado } from "@shared/invitar";
import { gameStore } from "./store";
import { VerseBox } from "./ui";

const CLAVE = "jer-invita";

type Resp = InvitarEstado & { message?: string; usado?: string };
async function pedir(path: string, body?: unknown): Promise<{ ok: boolean; status: number; data: Resp | null }> {
  try {
    const res = await fetch(`/api/jerusalen${path}`, {
      method: body === undefined ? "GET" : "POST",
      credentials: "include",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    return { ok: res.ok, status: res.status, data: (await res.json().catch(() => null)) as Resp | null };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}

/** Si la página se abrió con `?invita=CODIGO`, lo guarda en el teléfono (para usarlo al entrar a Jerusalén). */
export function guardarInvitacionDeLaUrl() {
  try {
    const c = normalizarCodigo(new URLSearchParams(window.location.search).get("invita"));
    if (c) localStorage.setItem(CLAVE, JSON.stringify({ c, at: Date.now() }));
  } catch {
    /* sin almacenamiento */
  }
}

/** Al entrar a Jerusalén: si hay un código guardado, se usa (una vez). Avisa quién te invitó. */
export async function usarInvitacionGuardada() {
  let guardado: { c: string; at: number } | null = null;
  try {
    guardado = JSON.parse(localStorage.getItem(CLAVE) || "null");
  } catch {
    guardado = null;
  }
  if (!guardado?.c) return;
  // un enlace viejo (más de los días para usarlo) ya no sirve
  if (Date.now() - guardado.at > INVITAR.diasParaUsar * 86_400_000) {
    localStorage.removeItem(CLAVE);
    return;
  }
  const r = await pedir("/invitar/usar", { codigo: guardado.c });
  if (r.status === 0 || r.status === 429 || r.status >= 500) return; // se intenta la próxima vez
  localStorage.removeItem(CLAVE);
  if (r.ok && r.data?.usado) gameStore.toast(`🤝 Entraste con la invitación de ${r.data.usado}. Juega ${INVITAR.dias} días y los dos ganan gozo y la faja del buen amigo.`, "gold");
}

/** La tarjeta «Invita a un amigo» (en las Misiones). */
export function InvitarAmigo() {
  const [e, setE] = useState<InvitarEstado | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [codigo, setCodigo] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    void pedir("/invitar").then((r) => {
      if (r.ok && r.data) setE(r.data);
      else setError(r.data?.message || null);
    });
  }, []);
  if (!e) return error ? null : <Loader2 className="mx-auto h-4 w-4 animate-spin text-stone-400" />;
  const enlace = enlaceDeInvitacion(window.location.origin, e.codigo);
  const texto = `¡Juega conmigo en Jerusalén en línea, el juego del templo del ministerio! Entra con mi enlace y, cuando juegues ${INVITAR.dias} días, los dos ganamos gozo: ${enlace}`;
  const compartir = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "Jerusalén en línea", text: texto });
        return;
      }
    } catch {
      return; // canceló
    }
    try {
      await navigator.clipboard.writeText(texto);
      gameStore.toast("Copiaste tu invitación: pégala en WhatsApp o donde quieras.", "gold");
    } catch {
      gameStore.toast(`Tu código: ${e.codigo}`, "info");
    }
  };
  const usar = async () => {
    setBusy(true);
    setError(null);
    const r = await pedir("/invitar/usar", { codigo });
    setBusy(false);
    if (r.ok && r.data) {
      setE(r.data);
      gameStore.toast(`🤝 Entraste con la invitación de ${r.data.usado ?? "tu amigo"}.`, "gold");
    } else setError(r.data?.message || "No se pudo usar el código.");
  };
  return (
    <section className="space-y-2 rounded-xl border border-teal-300 bg-teal-50/60 p-3 dark:border-teal-800 dark:bg-teal-950/20" data-testid="invitar-amigo">
      <p className="flex items-center gap-1.5 font-black">
        <UserPlus className="h-4 w-4" /> Invita a un amigo
      </p>
      <p className="text-xs text-stone-600 dark:text-stone-300">
        Cuando tu amigo entre con tu enlace (con su cuenta aprobada) y juegue {INVITAR.dias} días, tú ganas ✨ {INVITAR.gozoQuienInvita} y él ✨ {INVITAR.gozoInvitado}, y los dos reciben la faja del buen amigo.
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-lg bg-white px-3 py-1.5 font-mono text-base font-black tracking-[0.2em] ring-1 ring-teal-300 dark:bg-stone-900 dark:ring-teal-800" data-testid="invitar-codigo">
          {e.codigo}
        </span>
        <Button size="sm" className="rounded-full bg-teal-600 font-bold text-white hover:bg-teal-500" onClick={() => void compartir()} data-testid="invitar-compartir">
          <Share2 className="mr-1 h-4 w-4" /> Compartir
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="rounded-full"
          onClick={() => void navigator.clipboard?.writeText(enlace).then(() => gameStore.toast("Copiaste tu enlace.", "gold"), () => null)}
          data-testid="invitar-copiar"
        >
          <Copy className="mr-1 h-4 w-4" /> Copiar enlace
        </Button>
      </div>
      {e.invitados.length > 0 && (
        <ul className="space-y-0.5 text-xs" data-testid="invitar-lista">
          {e.invitados.map((x, i) => (
            <li key={`${x.nombre}-${i}`} className="flex justify-between gap-2 rounded bg-white/70 px-2 py-1 dark:bg-stone-900/40">
              <span>{x.nombre}</span>
              <span className="font-semibold">{x.premiado ? "✓ ya juega" : `${x.dias} de ${INVITAR.dias} días`}</span>
            </li>
          ))}
        </ul>
      )}
      {e.premiados >= INVITAR.maxPremiados && <p className="text-[11px] text-stone-500">Ya ganaste gozo por {INVITAR.maxPremiados} amigos: puedes seguir invitando (ellos sí ganan).</p>}
      {e.meInvito && (
        <p className="text-xs" data-testid="invitar-me-invito">
          Te invitó <b>{e.meInvito.nombre}</b>: {e.meInvito.premiado ? "¡ya ganaron los dos!" : `llevas ${e.meInvito.dias} de ${INVITAR.dias} días.`}
        </p>
      )}
      {e.puedeUsar && (
        <div className="flex flex-wrap items-center gap-1.5 text-xs" data-testid="invitar-usar">
          <span>¿Te invitó alguien? Escribe su código:</span>
          <input
            className="w-28 rounded-lg border border-stone-300 bg-white px-2 py-1 font-mono uppercase tracking-widest dark:border-stone-600 dark:bg-stone-900"
            value={codigo}
            maxLength={8}
            onChange={(x) => setCodigo(x.target.value)}
            aria-label="Código de quien te invitó"
            data-testid="invitar-input"
          />
          <Button size="sm" variant="secondary" disabled={busy || !normalizarCodigo(codigo)} onClick={() => void usar()} data-testid="invitar-usar-boton">
            Usar
          </Button>
        </div>
      )}
      {error && <p className="text-[11px] text-red-700 dark:text-red-300">{error}</p>}
      <VerseBox text={VERSO_INVITAR.text} refName={VERSO_INVITAR.ref} />
      <p className="text-center font-serif text-[12px] italic text-stone-500">
        «{VERSO_AMIGO.text}» <span className="not-italic font-semibold">— {VERSO_AMIGO.ref}</span>
      </p>
    </section>
  );
}
