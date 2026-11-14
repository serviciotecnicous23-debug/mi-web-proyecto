// Los mentores de la academia (server/academia-mentores.ts): en la página de un alumno del panel, quién lo acompaña y,
// con el permiso, elegir o quitar a su mentor; en la portada de la academia, la tarjeta de «Mis acompañados».
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, ArrowRight, HeartHandshake, Search, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { AlumnoDetalle } from "@shared/academia-direccion";
import { buscarPersonas, elegirMentor, useAcompanados, type PersonaBuscada } from "@/components/academia/api";

/** El mentor de un alumno en su página del panel: quién lo acompaña y, con permiso, elegirlo o quitarlo. */
export function MentorAlumno({ d, propio }: { d: AlumnoDetalle; propio: boolean }) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [buscando, setBuscando] = useState(false);
  const [q, setQ] = useState("");
  const [personas, setPersonas] = useState<PersonaBuscada[]>([]);
  const [elegida, setElegida] = useState<PersonaBuscada | null>(null);
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const puede = d.puede.mentores && !propio;

  useEffect(() => {
    if (!buscando || q.trim().length < 2) {
      setPersonas([]);
      return;
    }
    let vigente = true;
    const t = setTimeout(() => {
      buscarPersonas(q.trim())
        .then((r) => vigente && setPersonas(r.personas.filter((p) => p.id !== d.fila.userId)))
        .catch(() => vigente && setPersonas([]));
    }, 300);
    return () => {
      vigente = false;
      clearTimeout(t);
    };
  }, [q, buscando, d.fila.userId]);

  const guardar = async (mentorId: number | null) => {
    setOcupado(true);
    setError(null);
    try {
      const r = await elegirMentor(d.fila.userId, mentorId);
      toast({
        title: r.mentor ? `${r.mentor.nombre} acompañará a ${d.fila.nombre}` : "Mentor quitado",
        description: r.mentor ? "Los dos reciben un aviso en la campana." : `${d.fila.nombre} queda sin mentor.`,
      });
      setBuscando(false);
      setQ("");
      setElegida(null);
      void qc.invalidateQueries({ queryKey: ["academia", "direccion"] });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setOcupado(false);
    }
  };

  return (
    <section className="glass-card p-5 space-y-3" data-testid="alumno-mentor">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold flex items-center gap-2"><HeartHandshake className="w-4 h-4 text-orange-600" aria-hidden="true" /> Mentor</h2>
          <p className="text-sm mt-1" data-testid="alumno-mentor-nombre">
            {d.mentor ? <>Lo acompaña <strong>{d.mentor.nombre}</strong>.</> : "Todavía no tiene mentor."}
          </p>
          <p className="text-xs text-muted-foreground mt-1">El mentor ve su avance y si se detiene, sin notas ni datos de contacto.</p>
        </div>
        {puede && !buscando && (
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => setBuscando(true)} data-testid="mentor-elegir"><UserRound className="w-4 h-4 mr-1.5" /> {d.mentor ? "Cambiar" : "Elegir mentor"}</Button>
            {d.mentor && <Button size="sm" variant="ghost" onClick={() => guardar(null)} disabled={ocupado} data-testid="mentor-quitar"><X className="w-4 h-4 mr-1.5" /> Quitar</Button>}
          </div>
        )}
      </div>
      {buscando && (
        <div className="rounded-xl border border-border p-3 space-y-3">
          <label className="text-sm block">
            Busca por nombre o usuario
            <span className="relative block mt-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" aria-hidden="true" />
              <Input value={q} onChange={(e) => { setQ(e.target.value); setElegida(null); }} className="h-10 pl-9 text-[16px]" placeholder="Al menos 2 letras" data-testid="mentor-buscar" autoFocus />
            </span>
          </label>
          {personas.length > 0 && (
            <ul className="divide-y divide-border/60 rounded-lg border border-border" role="listbox" aria-label="Personas encontradas">
              {personas.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={elegida?.id === p.id}
                    onClick={() => setElegida(p)}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-muted ${elegida?.id === p.id ? "bg-orange-500/15" : ""}`}
                    data-testid="mentor-opcion"
                  >
                    <span className="font-medium">{p.nombre}</span> <span className="text-muted-foreground">@{p.usuario} · {p.rol}{p.iglesia ? ` · ${p.iglesia}` : ""}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {q.trim().length >= 2 && !personas.length && <p className="text-sm text-muted-foreground">Nadie con ese nombre (solo salen las cuentas activas).</p>}
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="fire-btn-primary" onClick={() => elegida && guardar(elegida.id)} disabled={ocupado || !elegida} data-testid="mentor-guardar">
              {ocupado ? "Guardando…" : elegida ? `Elegir a ${elegida.nombre}` : "Elige a alguien de la lista"}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => { setBuscando(false); setQ(""); setElegida(null); }} disabled={ocupado}>Cancelar</Button>
          </div>
        </div>
      )}
      {error && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
    </section>
  );
}

/** En la portada: a cuántos acompaño y cuántos se detuvieron. */
export function TarjetaAcompanados({ activo }: { activo: boolean }) {
  const q = useAcompanados(activo);
  const lista = q.data?.acompanados ?? [];
  if (!lista.length) return null;
  const detenidos = lista.filter((a) => a.detenido != null).length;
  return (
    <div className="max-w-6xl mx-auto px-4 mt-6">
      <Link href="/academia/acompanados">
        <span className={`glass-card p-4 flex items-center gap-3 hover:-translate-y-0.5 transition cursor-pointer ${detenidos ? "border border-orange-500/40" : ""}`} data-testid="academia-acompanados">
          <HeartHandshake className="w-5 h-5 text-orange-500 shrink-0" aria-hidden="true" />
          <span className="flex-1 text-sm">
            <strong>Mis acompañados.</strong> Acompañas a {lista.length} {lista.length === 1 ? "persona" : "personas"} en la academia
            {detenidos ? <> · <AlertTriangle className="w-3.5 h-3.5 inline -mt-0.5 text-orange-500" aria-hidden="true" /> {detenidos} {detenidos === 1 ? "se detuvo" : "se detuvieron"}</> : ""}.
          </span>
          <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
        </span>
      </Link>
    </div>
  );
}
