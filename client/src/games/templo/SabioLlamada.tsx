/**
 * La llamada de «¿Quién es sabio?» que le llega a un amigo o vecino (sabio-red.ts): está en la ciudad o en el
 * templo, y alguien que juega le pide consejo. Ve la pregunta y las respuestas (nunca cuál es la buena), elige una,
 * dice qué tan seguro está y la manda; o dice que no puede. Tiene 30 segundos.
 */
import { useEffect, useRef, useState } from "react";
import { Loader2, PhoneCall, X } from "lucide-react";
import { CONFIANZAS, LLAMADA_S, VERSO_CONSEJO, type Confianza } from "@shared/sabio";
import { ICONO_CAMINO } from "./barrio-chat";
import { sabioRed, useLlamadaEntrante } from "./sabio-red";

const LETRAS = ["A", "B", "C", "D"];

export function LlamadaEntrante() {
  const l = useLlamadaEntrante();
  const [elegida, setElegida] = useState<number | null>(null);
  const [confianza, setConfianza] = useState<Confianza>("creo");
  const [enviando, setEnviando] = useState(false);
  const [hecho, setHecho] = useState<string | null>(null);
  const [restan, setRestan] = useState(LLAMADA_S);
  // mientras se manda (o se muestra el «gracias») la tarjeta no se cierra sola
  const ocupada = useRef(false);
  ocupada.current = enviando || !!hecho;

  // cada llamada nueva empieza limpia
  useEffect(() => {
    setElegida(null);
    setConfianza("creo");
    setHecho(null);
    setEnviando(false);
  }, [l?.id, l?.hasta]);

  useEffect(() => {
    if (!l) return;
    const t = setInterval(() => {
      setRestan(Math.max(0, Math.ceil((l.hasta - Date.now()) / 1000)));
      if (Date.now() - l.hasta > 2500 && !ocupada.current) {
        clearInterval(t);
        sabioRed.cerrar(l.id);
      }
    }, 250);
    return () => clearInterval(t);
  }, [l]);

  if (!l) return null;
  const id = l.id;

  async function mandar(noPuedo: boolean) {
    if (enviando || hecho) return;
    if (!noPuedo && elegida === null) return;
    setEnviando(true);
    let ok = false;
    let mensaje = "";
    try {
      const res = await fetch("/api/jerusalen/sabio/consejo", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, opcion: noPuedo ? null : elegida, confianza }),
      });
      ok = res.ok;
      if (!ok) mensaje = ((await res.json().catch(() => null)) as { message?: string } | null)?.message || "";
    } catch {
      mensaje = "No se pudo mandar. Revisa tu conexión.";
    }
    setEnviando(false);
    if (ok) setHecho(noPuedo ? "Le avisamos que ahora no puedes. Husai le dará su consejo." : `¡Gracias! Tu consejo ya le llegó a ${l!.de}.`);
    else setHecho(mensaje || "Esta llamada ya terminó.");
    setTimeout(() => sabioRed.cerrar(id), ok ? 2200 : 3000);
  }

  const urgente = restan <= 10;
  return (
    <div className="pointer-events-auto absolute inset-x-2 top-2 z-[65] mx-auto max-h-[calc(100%-1rem)] max-w-md overflow-y-auto rounded-2xl border border-amber-300/70 bg-gradient-to-b from-[#2a1d63] to-[#0f0a26] p-3 text-amber-50 shadow-2xl shadow-black/60" data-testid="sabio-llamada" role="dialog" aria-label={`${l.de} te pide consejo`}>
      <div className="flex items-start gap-2">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/90 text-white shadow-lg">
          <PhoneCall className="h-5 w-5 animate-pulse" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-300">Te llaman desde la casa de la sabiduría</p>
          <p className="text-[13px] leading-snug">
            <b>
              {ICONO_CAMINO[l.camino]} {l.de}
            </b>{" "}
            está en la grada {l.n} de «¿Quién es sabio?» y te pide consejo.
          </p>
        </div>
        <span className={`shrink-0 rounded-full px-2 py-1 text-sm font-black tabular-nums ${urgente ? "bg-red-500/80 text-white" : "bg-white/15"}`} data-testid="sabio-llamada-reloj" aria-label={`Quedan ${restan} segundos`}>
          {restan}
        </span>
        <button type="button" className="shrink-0 rounded-full bg-white/10 p-1.5 hover:bg-white/20" onClick={() => void mandar(true)} aria-label="No puedo ahora" disabled={enviando || !!hecho}>
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full ${urgente ? "bg-red-400" : "bg-amber-300"}`} style={{ width: `${(restan / LLAMADA_S) * 100}%`, transition: "width .25s linear" }} />
      </div>
      {hecho ? (
        <p className="mt-3 rounded-xl bg-emerald-900/50 p-3 text-center text-sm font-bold" data-testid="sabio-llamada-hecho">
          {hecho}
        </p>
      ) : (
        <>
          <p className="mt-2 rounded-xl border border-amber-300/50 bg-black/30 px-3 py-2 text-center font-serif text-[14px] font-semibold leading-snug" data-testid="sabio-llamada-pregunta">
            {l.texto}
          </p>
          <div className="mt-2 grid gap-1.5">
            {l.opciones.map((o, i) =>
              l.quitadas.includes(i) ? null : (
                <button
                  key={i}
                  type="button"
                  onClick={() => setElegida(i)}
                  aria-pressed={elegida === i}
                  className={`flex min-h-[40px] items-center gap-2 rounded-xl px-3 py-1.5 text-left text-[13px] font-semibold ${elegida === i ? "bg-amber-400 text-amber-950" : "border border-amber-300/40 bg-[#1b1446] hover:border-amber-300"}`}
                  data-testid={`sabio-llamada-opcion-${i}`}
                >
                  <span className={`font-black ${elegida === i ? "" : "text-amber-300"}`}>{LETRAS[i]}:</span>
                  <span className="min-w-0 flex-1">{o}</span>
                </button>
              ),
            )}
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1" role="radiogroup" aria-label="Qué tan seguro estás">
            {CONFIANZAS.map((c) => (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={confianza === c.id}
                onClick={() => setConfianza(c.id)}
                className={`rounded-full px-1.5 py-1.5 text-[11px] font-bold leading-tight ${confianza === c.id ? "bg-sky-400 text-sky-950" : "bg-white/10 hover:bg-white/20"}`}
                data-testid={`sabio-llamada-confianza-${c.id}`}
              >
                {c.texto}
              </button>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-[1fr_auto] gap-2">
            <button
              type="button"
              disabled={elegida === null || enviando}
              onClick={() => void mandar(false)}
              className="rounded-xl bg-gradient-to-b from-[#ffe28a] to-[#e0a91c] px-3 py-2.5 text-sm font-black text-amber-950 disabled:opacity-50"
              data-testid="sabio-llamada-enviar"
            >
              {enviando ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : elegida === null ? "Elige una respuesta" : `Mandar mi consejo (${LETRAS[elegida]})`}
            </button>
            <button type="button" disabled={enviando} onClick={() => void mandar(true)} className="rounded-xl bg-white/10 px-3 py-2.5 text-xs font-bold hover:bg-white/20" data-testid="sabio-llamada-no">
              No puedo ahora
            </button>
          </div>
          <p className="mt-2 text-center font-serif text-[11px] italic text-amber-100/70">
            «{VERSO_CONSEJO.text}» <span className="not-italic font-semibold text-amber-300">{VERSO_CONSEJO.ref}</span>
          </p>
        </>
      )}
    </div>
  );
}
