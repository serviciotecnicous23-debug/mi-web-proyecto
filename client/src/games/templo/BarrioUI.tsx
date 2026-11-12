/**
 * «Tu barrio» (shared/barrio.ts): el barrio como clan. La charla del barrio (frases, versículos y
 * mensajes cortos que pasan por un filtro; denunciar, bloquear y borrar), los vecinos con quién está
 * en línea y dónde, y el emblema y el lema que eligen los vecinos con su voto.
 */
import { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Ban, Flag, Footprints, Home, Loader2, Megaphone, MessageCircle, MoreHorizontal, Send, Shield, Store, Trash2, Trophy, Users, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, hace } from "./ui";
import { gameStore } from "./store";
import { CiudadCtx } from "./CiudadUI";
import { ObrasDelBarrio } from "./BarrioObrasUI";

/** Las obras del barrio, con el gozo nuevo en el marcador de la ciudad. */
function ObrasDelBarrioConMundo() {
  const { city, estado, setEstado } = useContext(CiudadCtx);
  return (
    <ObrasDelBarrio
      alGozo={(g) => {
        city?.ponerGozo(g);
        if (estado) setEstado?.({ ...estado, yo: { ...estado.yo, gozo: g } });
      }}
    />
  );
}
import { ICONO_CAMINO, chatBarrio, pedirBarrio, textoDeMensaje, useChatBarrio } from "./barrio-chat";
import { CHAT_MAX, EMBLEMAS, LEMAS, VERSO_PALABRA, revisarMensaje, type BarrioVista, type MensajeBarrio } from "@shared/barrio";
import { FRASES, VERSICULOS_RAPIDOS } from "@shared/ciudad";
import { MOTIVOS_DE_DENUNCIA, type MotivoDeDenuncia } from "@shared/reports";
import { nombreEscalonCamino } from "@shared/caminos";
import { escalonNombre } from "@shared/jerusalen";
import { CopaDelBarrio } from "./BarrioCopa";
import { PuebloDelBarrio } from "./BarrioPueblo";
import { invitarVecino, irConVecino } from "./Acompanar";

type Pestana = "charla" | "vecinos" | "emblema" | "copa" | "obras" | "pueblo";

const cerrar = () => gameStore.close();

export function BarrioView({ pestana }: { pestana?: Pestana }) {
  const chat = useChatBarrio();
  const [tab, setTab] = useState<Pestana>(pestana ?? "charla");
  const [vista, setVista] = useState<BarrioVista | null>(null);
  const [error, setError] = useState<string | null>(null);
  // la administración puede mirar la charla de otro barrio (para moderar)
  const [otro, setOtro] = useState<number | null>(null);
  const [otroMensajes, setOtroMensajes] = useState<{ lista: MensajeBarrio[]; hayMas: boolean }>({ lista: [], hayMas: false });

  const cargar = useCallback(async (n: number | null) => {
    const r = await pedirBarrio<BarrioVista>(n ? `?n=${n}` : "");
    if (!r.ok || !r.data) {
      setError(r.data?.message || "No se pudo abrir el barrio. Revisa tu conexión.");
      return;
    }
    setError(null);
    setVista(r.data);
    if (n && n !== chatBarrio.get().n) setOtroMensajes({ lista: r.data.chat, hayMas: r.data.hayMas });
    else chatBarrio.cargar(r.data);
  }, []);

  useEffect(() => {
    void cargar(otro);
  }, [otro, cargar]);

  // con la charla de mi barrio a la vista, lo que llega se da por visto
  const propio = !!vista && vista.n === chat.n && !otro;
  useEffect(() => {
    chatBarrio.abrir(tab === "charla" && propio);
    return () => chatBarrio.abrir(false);
  }, [tab, propio, vista]);

  const emblema = vista?.emblema ?? chat.emblema;
  const titulo = (
    <span className="flex min-w-0 items-center gap-2">
      <span className="text-xl leading-none" aria-hidden="true">
        {emblema?.icono ?? "🏘️"}
      </span>
      <span className="truncate">{vista?.nombre ?? chat.nombre ?? "Tu barrio"}</span>
    </span>
  );
  return (
    <Card title={titulo} onClose={cerrar} testid="ciudad-barrio" wide>
      {!vista ? (
        <div className="p-6 text-center text-sm">
          {error ? <p className="text-red-700 dark:text-red-300">{error}</p> : <Loader2 className="mx-auto h-6 w-6 animate-spin text-amber-600" />}
        </div>
      ) : (
        <div className="space-y-3 p-3 text-sm sm:p-4">
          {otro ? (
            <p className="rounded-lg bg-sky-50 px-2 py-1 text-xs text-sky-900 dark:bg-sky-950/40 dark:text-sky-200">
              Administración: miras la charla de {vista.nombre} (barrio {vista.n}).{" "}
              <button type="button" className="font-bold underline" onClick={() => setOtro(null)}>
                Volver al mío
              </button>
            </p>
          ) : (
            <p className="font-serif text-[13px] italic leading-snug text-stone-600 dark:text-stone-300" data-testid="barrio-lema">
              «{vista.lema.text}» <span className="not-italic text-[11px] font-semibold text-amber-800 dark:text-amber-300">{vista.lema.ref}</span>
            </p>
          )}
          <div className="grid grid-cols-6 gap-0.5 rounded-full bg-amber-100/70 p-1 dark:bg-amber-950/40">
            {(
              [
                ["charla", "Charla", MessageCircle],
                ["vecinos", "Vecinos", Users],
                ["emblema", "Emblema", Shield],
                ["copa", "Copa", Trophy],
                ["obras", "Obras", Hammer],
                ["pueblo", "Pueblo", Store],
              ] as const
            ).map(([id, nombre, Icono]) => (
              <button
                key={id}
                type="button"
                aria-pressed={tab === id}
                onClick={() => setTab(id)}
                className={`flex items-center justify-center gap-1 whitespace-nowrap rounded-full px-1 py-1.5 text-xs font-bold ${tab === id ? "bg-white text-amber-900 shadow dark:bg-stone-800 dark:text-amber-200" : "text-amber-900/70 dark:text-amber-200/70"}`}
                data-testid={`barrio-tab-${id}`}
              >
                <Icono className="hidden h-3.5 w-3.5 shrink-0 sm:inline" /> {nombre}
              </button>
            ))}
          </div>
          {tab === "charla" && (
            <Charla
              vista={vista}
              propio={propio}
              mensajes={propio ? chat.mensajes : otroMensajes.lista}
              hayMas={propio ? chat.hayMas : otroMensajes.hayMas}
              onAntes={async () => {
                const primero = (propio ? chat.mensajes : otroMensajes.lista)[0];
                if (!primero) return;
                const r = await pedirBarrio<{ mensajes: MensajeBarrio[]; hayMas: boolean }>(`/chat?antes=${primero.id}${otro ? `&n=${otro}` : ""}`);
                if (!r.ok || !r.data) return;
                if (propio) chatBarrio.antes(r.data.mensajes, r.data.hayMas);
                else setOtroMensajes((o) => ({ lista: [...r.data!.mensajes, ...o.lista], hayMas: r.data!.hayMas }));
              }}
              onQuitarOtro={(id) => setOtroMensajes((o) => ({ ...o, lista: o.lista.filter((m) => m.id !== id) }))}
              onVerOtro={(n) => setOtro(n)}
            />
          )}
          {tab === "vecinos" && <Vecinos vista={vista} propio={propio} />}
          {tab === "emblema" && <EmblemaYLema vista={vista} propio={propio} onVista={setVista} />}
          {tab === "copa" && <CopaDelBarrio />}
          {tab === "obras" && <ObrasDelBarrioConMundo />}
          {tab === "pueblo" && <PuebloDelBarrio />}
        </div>
      )}
    </Card>
  );
}

// ================================================================ la charla
function Charla({
  vista,
  propio,
  mensajes,
  hayMas,
  onAntes,
  onQuitarOtro,
  onVerOtro,
}: {
  vista: BarrioVista;
  propio: boolean;
  mensajes: MensajeBarrio[];
  hayMas: boolean;
  onAntes: () => Promise<void>;
  onQuitarOtro: (id: number) => void;
  onVerOtro: (n: number) => void;
}) {
  const { city } = useContext(CiudadCtx);
  const chat = useChatBarrio();
  const [texto, setTexto] = useState("");
  const [aviso, setAviso] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [frases, setFrases] = useState(false);
  const [menu, setMenu] = useState<number | null>(null);
  const [denunciar, setDenunciar] = useState<MensajeBarrio | null>(null);
  const [bloquear, setBloquear] = useState<MensajeBarrio | null>(null);
  const [cargandoAntes, setCargandoAntes] = useState(false);
  const [barrioAdmin, setBarrioAdmin] = useState("");
  const lista = useRef<HTMLDivElement>(null);
  const abajo = useRef(true);
  const visibles = chat.soloFrases ? mensajes.filter((m) => m.mio || m.frase) : mensajes;
  const ocultos = mensajes.length - visibles.length;
  const ultimo = visibles[visibles.length - 1]?.id ?? 0;

  // al llegar uno nuevo se baja hasta él (si estaba abajo)
  useLayoutEffect(() => {
    const el = lista.current;
    if (el && abajo.current) el.scrollTop = el.scrollHeight;
  }, [ultimo]);

  const quitar = (id: number) => {
    chatBarrio.quitar(id);
    onQuitarOtro(id);
  };

  const enviar = async (cuerpo: { texto?: string; frase?: string }) => {
    if (cuerpo.texto !== undefined) {
      const r = revisarMensaje(cuerpo.texto);
      if (!r.ok) {
        setAviso(r.motivo);
        return;
      }
    }
    setEnviando(true);
    setAviso(null);
    const r = await pedirBarrio<{ mensaje: MensajeBarrio }>("/chat", { method: "POST", body: JSON.stringify(cuerpo) });
    setEnviando(false);
    if (r.ok && r.data?.mensaje) {
      chatBarrio.recibir(r.data.mensaje);
      if (cuerpo.texto !== undefined) setTexto("");
      setFrases(false);
      abajo.current = true;
      city?.audio.click();
    } else setAviso(r.data?.message || "No se pudo enviar. Revisa tu conexión.");
  };

  const borrar = async (m: MensajeBarrio) => {
    setMenu(null);
    const res = await fetch(`/api/jerusalen/barrio/chat/${m.id}`, { method: "DELETE", credentials: "include" }).catch(() => null);
    if (res?.ok || res?.status === 404) quitar(m.id);
    else setAviso("No se pudo borrar. Revisa tu conexión.");
  };

  return (
    <div className="space-y-2">
      {vista.esAdmin && (
        <form
          className="flex items-center gap-1.5 text-[11px] text-stone-500"
          onSubmit={(e) => {
            e.preventDefault();
            const n = Number(barrioAdmin);
            if (Number.isInteger(n) && n > 0) onVerOtro(n);
          }}
        >
          <Shield className="h-3.5 w-3.5" /> Administración: ver la charla del barrio n.º
          <input
            className="w-14 rounded border border-stone-300 bg-white px-1 py-0.5 text-[11px] dark:border-stone-700 dark:bg-stone-900"
            inputMode="numeric"
            value={barrioAdmin}
            onChange={(e) => setBarrioAdmin(e.target.value.replace(/\D/g, "").slice(0, 5))}
            aria-label="Número del barrio"
            data-testid="barrio-admin-n"
          />
          <button type="submit" className="font-bold text-sky-700 underline dark:text-sky-300">
            Ver
          </button>
        </form>
      )}
      <div
        ref={lista}
        className="max-h-[42dvh] min-h-[11rem] space-y-1.5 overflow-y-auto rounded-xl border border-amber-200/70 bg-white/70 p-2 dark:border-amber-900/50 dark:bg-stone-900/40"
        onScroll={(e) => {
          const el = e.currentTarget;
          abajo.current = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
        }}
        data-testid="barrio-mensajes"
      >
        {hayMas && (
          <button
            type="button"
            className="mx-auto block rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold text-amber-900 dark:bg-amber-950/50 dark:text-amber-200"
            disabled={cargandoAntes}
            onClick={async () => {
              setCargandoAntes(true);
              abajo.current = false;
              await onAntes();
              setCargandoAntes(false);
            }}
            data-testid="barrio-antes"
          >
            {cargandoAntes ? "Cargando…" : "Ver mensajes anteriores"}
          </button>
        )}
        {visibles.length === 0 && (
          <p className="py-6 text-center text-xs text-stone-500">
            Todavía no hay mensajes. ¡Saluda a tus vecinos con una frase o un versículo!
          </p>
        )}
        {visibles.map((m) => (
          <div key={m.id} className={`flex items-end gap-1 ${m.mio ? "justify-end" : "justify-start"}`} data-testid="barrio-mensaje">
            <div
              className={`max-w-[82%] rounded-2xl px-2.5 py-1.5 shadow-sm ${m.mio ? "rounded-br-sm bg-amber-200/80 dark:bg-amber-800/50" : m.frase ? "rounded-bl-sm bg-amber-50 dark:bg-amber-950/40" : "rounded-bl-sm bg-white dark:bg-stone-800"}`}
            >
              <p className="text-[10.5px] font-bold text-amber-900/80 dark:text-amber-200/80">
                {ICONO_CAMINO[m.camino]} {m.mio ? "Tú" : m.nombre} · <span className="font-semibold opacity-80">{hace(m.at)}</span>
              </p>
              <p className={`break-words text-[13px] leading-snug ${m.ref ? "font-serif italic" : m.frase ? "font-semibold" : ""}`}>
                {m.ref ? (
                  <>
                    «{m.texto}» <span className="not-italic text-[11px] font-semibold text-amber-800 dark:text-amber-300">{m.ref}</span>
                  </>
                ) : (
                  m.texto
                )}
              </p>
            </div>
            {(
              <button
                type="button"
                className="mb-1 rounded-full p-1 text-stone-400 hover:bg-black/5 hover:text-stone-600 dark:hover:bg-white/10"
                onClick={() => setMenu(menu === m.id ? null : m.id)}
                aria-label="Opciones del mensaje"
                data-testid={`barrio-opciones-${m.id}`}
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
              </button>
            )}
            {menu === m.id && (
              <div className="mb-1 flex flex-col gap-0.5 rounded-xl border border-stone-200 bg-white p-1 text-[11px] shadow-lg dark:border-stone-700 dark:bg-stone-900">
                {!m.mio && propio && (
                  <>
                    <button type="button" className="flex items-center gap-1 rounded px-2 py-1 text-left text-red-700 hover:bg-red-50 dark:text-red-300" onClick={() => { setMenu(null); setDenunciar(m); }} data-testid="barrio-denunciar">
                      <Flag className="h-3 w-3" /> Denunciar
                    </button>
                    <button type="button" className="flex items-center gap-1 rounded px-2 py-1 text-left hover:bg-stone-50 dark:hover:bg-stone-800" onClick={() => { setMenu(null); setBloquear(m); }} data-testid="barrio-bloquear">
                      <Ban className="h-3 w-3" /> Bloquear
                    </button>
                  </>
                )}
                {(m.mio || vista.esAdmin) && (
                  <button type="button" className="flex items-center gap-1 rounded px-2 py-1 text-left hover:bg-stone-50 dark:hover:bg-stone-800" onClick={() => void borrar(m)} data-testid="barrio-borrar">
                    <Trash2 className="h-3 w-3" /> Borrar
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {ocultos > 0 && (
        <p className="text-center text-[11px] text-stone-500">
          {ocultos} {ocultos === 1 ? "mensaje escrito oculto" : "mensajes escritos ocultos"} («solo frases» está activado).
        </p>
      )}
      {aviso && (
        <p className="rounded-lg bg-red-50 px-2 py-1 text-xs text-red-800 dark:bg-red-950/40 dark:text-red-200" data-testid="barrio-aviso">
          {aviso}
        </p>
      )}
      {denunciar && <DenunciarMensaje m={denunciar} onListo={(quitado) => { if (quitado) quitar(denunciar.id); setDenunciar(null); }} />}
      {bloquear && (
        <div className="space-y-2 rounded-xl bg-stone-100 p-3 text-xs dark:bg-stone-900">
          <p>
            ¿Bloquear a <b>{bloquear.nombre}</b>? Dejarán de verse, de oírse y de leerse en la ciudad y en la charla. Puedes desbloquearlo en «Vecinos que se
            ven».
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" className="flex-1" onClick={() => setBloquear(null)}>
              Cancelar
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-stone-800 text-white hover:bg-stone-700"
              onClick={async () => {
                const m = bloquear;
                const res = await fetch("/api/jerusalen/ciudad/bloqueos", {
                  method: "POST",
                  credentials: "include",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ personajeId: m.de }),
                }).catch(() => null);
                setBloquear(null);
                if (res?.ok) {
                  chatBarrio.quitarDe(m.de);
                  city?.ocultarVecino(m.de);
                  setAviso(null);
                } else setAviso("No se pudo bloquear. Revisa tu conexión.");
              }}
              data-testid="barrio-bloquear-si"
            >
              <Ban className="mr-1 h-3.5 w-3.5" /> Bloquear
            </Button>
          </div>
        </div>
      )}
      {propio && vista.puedoEscribir ? (
        <div className="space-y-1.5">
          {!chat.soloFrases && (
            <form
              className="flex items-center gap-1.5"
              onSubmit={(e) => {
                e.preventDefault();
                if (!enviando) void enviar({ texto });
              }}
            >
              <input
                className="min-w-0 flex-1 rounded-full border border-amber-300 bg-white px-3 py-2 text-[14px] outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-300/50 dark:border-amber-800 dark:bg-stone-900"
                value={texto}
                onChange={(e) => {
                  setTexto(e.target.value);
                  if (aviso) setAviso(null);
                }}
                maxLength={CHAT_MAX + 20}
                placeholder="Escribe a tu barrio…"
                enterKeyHint="send"
                autoComplete="off"
                aria-label="Mensaje para tu barrio"
                data-testid="barrio-texto"
              />
              <Button type="submit" size="icon" className="shrink-0 rounded-full bg-amber-500 text-amber-950 hover:bg-amber-400" disabled={enviando || !texto.trim()} aria-label="Enviar" data-testid="barrio-enviar">
                {enviando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          )}
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              aria-pressed={frases}
              className={`rounded-full px-3 py-1 text-xs font-bold ${frases ? "bg-amber-500 text-amber-950" : "bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200"}`}
              onClick={() => setFrases(!frases)}
              data-testid="barrio-frases"
            >
              💬 Frases y versículos
            </button>
            {!chat.soloFrases && (
              <span className={`text-[11px] tabular-nums ${[...texto].length > CHAT_MAX ? "font-bold text-red-600" : "text-stone-500"}`}>
                {[...texto].length}/{CHAT_MAX}
              </span>
            )}
          </div>
          {frases && (
            <div className="space-y-1.5 rounded-xl bg-amber-50/70 p-2 dark:bg-amber-950/20" data-testid="barrio-frases-lista">
              <div className="grid grid-cols-2 gap-1">
                {FRASES.map((f) => (
                  <button key={f.id} type="button" disabled={enviando} className="rounded-lg border border-amber-200 bg-white px-2 py-1.5 text-left text-[12px] font-semibold hover:bg-amber-50 dark:border-amber-900/60 dark:bg-stone-900" onClick={() => void enviar({ frase: f.id })} data-testid={`barrio-frase-${f.id}`}>
                    {f.texto}
                  </button>
                ))}
              </div>
              {VERSICULOS_RAPIDOS.map((f) => (
                <button key={f.id} type="button" disabled={enviando} className="w-full rounded-lg border border-amber-200 bg-white px-2.5 py-1.5 text-left font-serif text-[12px] italic hover:bg-amber-50 dark:border-amber-900/60 dark:bg-stone-900" onClick={() => void enviar({ frase: f.id })} data-testid={`barrio-frase-${f.id}`}>
                  «{f.texto}» <span className="not-italic text-[11px] font-semibold text-amber-800 dark:text-amber-300">{f.ref}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        !propio ? null : (
          <p className="rounded-lg bg-stone-100 px-2 py-1.5 text-xs text-stone-600 dark:bg-stone-900 dark:text-stone-300">
            Estás fuera de la ciudad por una denuncia: puedes leer, pero no escribir en la charla.
          </p>
        )
      )}
      <label className="flex cursor-pointer items-center gap-2 text-[11px] text-stone-600 dark:text-stone-300">
        <input type="checkbox" checked={chat.soloFrases} onChange={(e) => chatBarrio.soloFrases(e.target.checked)} data-testid="barrio-solo-frases" />
        Solo frases y versículos en este teléfono (recomendado para niños)
      </label>
      <p className="text-[11px] leading-snug text-stone-500">
        Habla con gracia ({VERSO_PALABRA.ref}). No compartas tu teléfono, dirección, correo ni redes. Si un mensaje molesta, denúncialo o bloquea a quien lo
        escribió: la administración lo revisa.
      </p>
    </div>
  );
}

function DenunciarMensaje({ m, onListo }: { m: MensajeBarrio; onListo: (quitado: boolean) => void }) {
  const [motivo, setMotivo] = useState<MotivoDeDenuncia | "">("");
  const [detalles, setDetalles] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hecho, setHecho] = useState(false);
  if (hecho) {
    return (
      <div className="space-y-2 rounded-xl bg-amber-50 p-3 text-xs dark:bg-amber-950/30" data-testid="barrio-denuncia-hecha">
        <p>Gracias. Ya no verás ese mensaje y la administración lo revisará. Si quieres, también puedes bloquear a {m.nombre}.</p>
        <Button size="sm" variant="secondary" className="w-full" onClick={() => onListo(true)}>
          Listo
        </Button>
      </div>
    );
  }
  return (
    <div className="space-y-2 rounded-xl border border-red-200 bg-red-50/60 p-3 text-xs dark:border-red-900/50 dark:bg-red-950/20" data-testid="barrio-denuncia">
      <p className="font-bold">Denunciar el mensaje de {m.nombre}</p>
      <p className="rounded bg-white/70 px-2 py-1 italic dark:bg-stone-900/60">«{textoDeMensaje(m)}»</p>
      <div className="space-y-0.5">
        {(Object.keys(MOTIVOS_DE_DENUNCIA) as MotivoDeDenuncia[]).map((x) => (
          <label key={x} className="flex cursor-pointer items-center gap-2 rounded px-1 py-0.5">
            <input type="radio" name="motivo-mensaje" checked={motivo === x} onChange={() => setMotivo(x)} />
            <span>{MOTIVOS_DE_DENUNCIA[x]}</span>
          </label>
        ))}
      </div>
      <textarea
        className="w-full rounded-lg border border-stone-300 bg-white p-2 text-xs dark:border-stone-700 dark:bg-stone-900"
        rows={2}
        maxLength={500}
        placeholder="Detalles (opcional)"
        value={detalles}
        onChange={(e) => setDetalles(e.target.value)}
      />
      {error && <p className="text-red-700 dark:text-red-300">{error}</p>}
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" className="flex-1" onClick={() => onListo(false)}>
          Cancelar
        </Button>
        <Button
          size="sm"
          variant="destructive"
          className="flex-1"
          disabled={busy || !motivo}
          onClick={async () => {
            setBusy(true);
            try {
              const res = await fetch("/api/reports", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contentType: "mensaje", contentId: m.id, reason: motivo, details: detalles.trim() || undefined }),
              });
              const data = await res.json().catch(() => ({}));
              if (res.ok) setHecho(true);
              else setError(data.message || "No se pudo enviar la denuncia.");
            } catch {
              setError("Revisa tu conexión.");
            }
            setBusy(false);
          }}
          data-testid="barrio-denunciar-si"
        >
          {busy ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <Flag className="mr-1 h-3.5 w-3.5" />} Denunciar
        </Button>
      </div>
    </div>
  );
}

// ================================================================ los vecinos
function Vecinos({ vista, propio }: { vista: BarrioVista; propio: boolean }) {
  const { city } = useContext(CiudadCtx);
  const enLinea = vista.miembros.filter((m) => m.enLinea).length;
  const [ocupado, setOcupado] = useState<number | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  // ir adonde está (y seguirlo), o invitarlo a venir adonde estás (Acompanar.tsx)
  const irCon = async (personajeId: number) => {
    if (!city) return;
    setOcupado(personajeId);
    const r = await irConVecino(city, personajeId, true);
    setOcupado(null);
    if (r) setAviso(r);
    else cerrar();
  };
  const invitar = async (personajeId: number) => {
    setOcupado(personajeId);
    const r = await invitarVecino(personajeId);
    setOcupado(null);
    setAviso(r.texto);
  };
  return (
    <div className="space-y-2">
      <p className="text-xs text-stone-500" data-testid="barrio-cuantos">
        {vista.miembros.length} {vista.miembros.length === 1 ? "casa" : "casas"} en {vista.nombre} · {enLinea} en línea ahora
      </p>
      <ul className="divide-y rounded-xl border dark:divide-stone-700 dark:border-stone-700">
        {vista.miembros.map((m) => (
          <li key={m.casaId} className="flex items-center gap-2.5 px-3 py-2" data-testid={`barrio-vecino-${m.casaId}`}>
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${m.enLinea ? "bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,.2)]" : "bg-stone-300 dark:bg-stone-600"}`} aria-label={m.enLinea ? "En línea" : "No está en línea"} />
            <span className="min-w-0 flex-1">
              <span className="block truncate font-bold">
                {ICONO_CAMINO[m.camino]} {m.nombre}
                {m.esYo ? " (tú)" : ""}
              </span>
              <span className="block truncate text-xs text-stone-500">
                {nombreEscalonCamino(m.camino, m.escalon, escalonNombre(m.escalon))} · casa {m.parcela + 1}
              </span>
              {m.donde && <span className="block truncate text-xs font-semibold text-emerald-700 dark:text-emerald-300">{m.donde}</span>}
              {!m.esYo && propio && city && m.enLinea && (
                <span className="mt-1 flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    disabled={ocupado !== null}
                    onClick={() => void irCon(m.personajeId)}
                    className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white disabled:opacity-50"
                    data-testid={`barrio-ir-con-${m.casaId}`}
                  >
                    {ocupado === m.personajeId ? <Loader2 className="h-3 w-3 animate-spin" /> : <Footprints className="h-3 w-3" />} Ir con {m.nombre.split(" ")[0]}
                  </button>
                  <button
                    type="button"
                    disabled={ocupado !== null}
                    onClick={() => void invitar(m.personajeId)}
                    className="inline-flex items-center gap-1 rounded-full bg-sky-600 px-2.5 py-1 text-[11px] font-bold text-white disabled:opacity-50"
                    data-testid={`barrio-invitar-${m.casaId}`}
                  >
                    <Megaphone className="h-3 w-3" /> Invitar a venir
                  </button>
                </span>
              )}
            </span>
            {!m.esYo && propio && city && (
              <Button
                size="sm"
                variant="secondary"
                className="shrink-0 rounded-full px-2.5 text-xs"
                onClick={() => {
                  cerrar();
                  city.irACasaDe(vista.n, m.parcela);
                }}
                data-testid={`barrio-ir-${m.casaId}`}
              >
                <Home className="mr-1 h-3.5 w-3.5" /> Su casa
              </Button>
            )}
          </li>
        ))}
      </ul>
      {aviso && (
        <p className="rounded-lg bg-amber-50 px-2 py-1.5 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-200" data-testid="barrio-acompanar-aviso">
          {aviso}
        </p>
      )}
      <p className="text-[11px] text-stone-500">«Ir con…» te lleva adonde está tu vecino y lo sigues caminando. Quien apaga «Recibir llamadas e invitaciones» en la casa de la sabiduría no las recibe.</p>
    </div>
  );
}

// ================================================================ el emblema y el lema
function EmblemaYLema({ vista, propio, onVista }: { vista: BarrioVista; propio: boolean; onVista: (v: BarrioVista) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const votar = async (cuerpo: { emblema?: string; lema?: string }) => {
    if (!propio || busy) return;
    setBusy(true);
    setError(null);
    const r = await pedirBarrio<Pick<BarrioVista, "emblema" | "lema" | "votos">>("/voto", { method: "POST", body: JSON.stringify(cuerpo) });
    setBusy(false);
    if (r.ok && r.data) {
      onVista({ ...vista, emblema: r.data.emblema, lema: r.data.lema, votos: r.data.votos });
      chatBarrio.identidad(r.data.emblema, r.data.lema);
    } else setError(r.data?.message || "No se pudo votar. Revisa tu conexión.");
  };
  const v = vista.votos;
  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-gradient-to-b from-amber-100 to-amber-50 p-3 text-center dark:from-amber-950/50 dark:to-transparent" data-testid="barrio-emblema">
        <div className="text-5xl leading-none">{vista.emblema.icono}</div>
        <p className="mt-1 font-serif text-base font-bold text-amber-900 dark:text-amber-200">{vista.emblema.nombre}</p>
        <p className="text-[11px] font-semibold text-amber-800/80 dark:text-amber-300/80">{vista.emblema.ref}</p>
      </div>
      <p className="text-xs text-stone-500">El emblema y el lema del barrio los eligen sus vecinos: gana el que tiene más votos. Tu voto se puede cambiar cuando quieras.</p>
      {error && <p className="text-xs text-red-700 dark:text-red-300">{error}</p>}
      <div className="grid grid-cols-3 gap-1.5">
        {EMBLEMAS.map((e) => (
          <button
            key={e.id}
            type="button"
            aria-pressed={v.mio.emblema === e.id}
            disabled={!propio || busy}
            onClick={() => void votar({ emblema: e.id })}
            className={`relative flex flex-col items-center gap-0.5 rounded-xl border px-1 py-2 text-center ${v.mio.emblema === e.id ? "border-amber-500 bg-amber-100 ring-2 ring-amber-400 dark:bg-amber-900/40" : "border-amber-200 bg-white hover:bg-amber-50 dark:border-amber-900/60 dark:bg-stone-900"}`}
            data-testid={`barrio-voto-emblema-${e.id}`}
          >
            <span className="text-2xl leading-none">{e.icono}</span>
            <span className="text-[10.5px] font-semibold leading-tight">{e.nombre}</span>
            {(v.emblemas[e.id] || 0) > 0 && (
              <span className="absolute right-1 top-1 min-w-[1.1rem] rounded-full bg-amber-500 px-1 text-[10px] font-black leading-4 text-amber-950">{v.emblemas[e.id]}</span>
            )}
          </button>
        ))}
      </div>
      <p className="pt-1 text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">El lema</p>
      <div className="space-y-1.5">
        {LEMAS.map((l) => (
          <button
            key={l.id}
            type="button"
            aria-pressed={v.mio.lema === l.id}
            disabled={!propio || busy}
            onClick={() => void votar({ lema: l.id })}
            className={`flex w-full items-start gap-2 rounded-xl border px-2.5 py-2 text-left ${v.mio.lema === l.id ? "border-amber-500 bg-amber-100 ring-2 ring-amber-400 dark:bg-amber-900/40" : "border-amber-200 bg-white hover:bg-amber-50 dark:border-amber-900/60 dark:bg-stone-900"}`}
            data-testid={`barrio-voto-lema-${l.id}`}
          >
            <span className="min-w-0 flex-1 font-serif text-[12.5px] italic leading-snug">
              «{l.text}» <span className="not-italic text-[11px] font-semibold text-amber-800 dark:text-amber-300">{l.ref}</span>
            </span>
            {(v.lemas[l.id] || 0) > 0 && <span className="shrink-0 rounded-full bg-amber-500 px-1.5 text-[10px] font-black leading-4 text-amber-950">{v.lemas[l.id]}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
