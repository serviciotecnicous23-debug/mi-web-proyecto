// Dos listas del panel general que no tenían pantalla (revisión del 21-nov): las solicitudes de alianza de las iglesias
// (el formulario público /alianza las guardaba y nadie las veía) y las fichas ministeriales por aprobar (solo se podían
// aprobar adivinando la dirección de cada ficha). Pensadas primero para el teléfono: tarjetas con sus botones a la vista.
import { useState } from "react";
import { Link } from "wouter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Church, ExternalLink, Loader2, Mail, MapPin, Phone, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { Confirmacion } from "./panel-general";

type Alianza = {
  id: number;
  churchName: string;
  pastorName: string;
  pastorEmail: string;
  pastorPhone: string | null;
  city: string | null;
  country: string | null;
  denomination: string | null;
  congregationSize: string | null;
  motivation: string | null;
  website: string | null;
  status: "pendiente" | "en_revision" | "aprobada" | "rechazada";
  createdAt: string | null;
};

const ESTADO: Record<Alianza["status"], { texto: string; clase: string }> = {
  pendiente: { texto: "Nueva", clase: "bg-orange-500/15 text-orange-800 dark:text-orange-200" },
  en_revision: { texto: "En revisión", clase: "bg-sky-500/15 text-sky-800 dark:text-sky-200" },
  aprobada: { texto: "Aprobada", clase: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200" },
  rechazada: { texto: "Rechazada", clase: "bg-muted text-muted-foreground" },
};
const ORDEN: Alianza["status"][] = ["pendiente", "en_revision", "aprobada", "rechazada"];
const fecha = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" }) : "");

async function pedirJson<T>(metodo: string, url: string, cuerpo?: unknown): Promise<T> {
  const r = await fetch(url, {
    method: metodo,
    credentials: "include",
    headers: cuerpo !== undefined ? { "Content-Type": "application/json" } : {},
    body: cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined,
  });
  if (!r.ok) throw new Error(r.status === 403 ? "Tu cuenta no puede hacer esto." : "No se pudo completar. Inténtalo otra vez.");
  return r.json();
}

export function useAlianzas(activo: boolean) {
  return useQuery<Alianza[]>({ queryKey: ["/api/alliance-requests"], queryFn: () => pedirJson("GET", "/api/alliance-requests"), enabled: activo, retry: false });
}

/** Las solicitudes de alianza: las nuevas primero, con «En revisión», «Aprobar» y «Rechazar» (este último con confirmación). */
export function AlianzasAdmin({ confirmar }: { confirmar: (c: Confirmacion) => void }) {
  const q = useAlianzas(true);
  const qc = useQueryClient();
  const { toast } = useToast();
  const [ocupado, setOcupado] = useState<number | null>(null);
  const cambiar = async (a: Alianza, status: Alianza["status"]) => {
    setOcupado(a.id);
    try {
      await pedirJson("PATCH", `/api/alliance-requests/${a.id}`, { status });
      await qc.invalidateQueries({ queryKey: ["/api/alliance-requests"] });
      toast({ title: `${a.churchName}: ${ESTADO[status].texto.toLowerCase()}` });
    } catch (e: any) {
      toast({ title: "No se pudo cambiar", description: e?.message, variant: "destructive" });
    } finally {
      setOcupado(null);
    }
  };
  if (q.isLoading) return <div className="py-10 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-orange-500" /></div>;
  if (q.error) return <p className="text-sm text-red-600 py-6" role="alert">{(q.error as Error).message}</p>;
  const lista = [...(q.data ?? [])].sort((x, y) => ORDEN.indexOf(x.status) - ORDEN.indexOf(y.status) || (Date.parse(y.createdAt ?? "") || 0) - (Date.parse(x.createdAt ?? "") || 0));
  return (
    <section className="space-y-3" data-testid="admin-alianzas">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2"><Church className="w-5 h-5 text-orange-600" aria-hidden="true" /> Solicitudes de alianza</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Las iglesias que pidieron unirse a la red desde la página «Alianza». Escríbele al pastor y, cuando lo decidan, apruébala o recházala.
        </p>
      </div>
      {lista.length === 0 ? (
        <p className="glass-card p-5 text-sm text-muted-foreground">Todavía no hay solicitudes de alianza.</p>
      ) : (
        <ul className="grid gap-3 lg:grid-cols-2">
          {lista.map((a) => (
            <li key={a.id} className="glass-card p-4 space-y-2" data-testid={`alianza-${a.id}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold leading-snug break-words">{a.churchName}</p>
                  <p className="text-sm text-muted-foreground">Pastor: {a.pastorName}</p>
                </div>
                <span className={`shrink-0 text-xs font-semibold rounded-full px-2.5 py-1 ${ESTADO[a.status].clase}`}>{ESTADO[a.status].texto}</span>
              </div>
              <ul className="text-sm space-y-1">
                <li className="flex items-center gap-2 min-w-0"><Mail className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" /><a href={`mailto:${a.pastorEmail}`} className="underline break-all">{a.pastorEmail}</a></li>
                {a.pastorPhone && <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" /><a href={`tel:${a.pastorPhone}`} className="underline">{a.pastorPhone}</a></li>}
                {(a.city || a.country) && <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />{[a.city, a.country].filter(Boolean).join(", ")}</li>}
              </ul>
              {(a.denomination || a.congregationSize) && (
                <p className="text-xs text-muted-foreground">{[a.denomination, a.congregationSize ? `Congregación: ${a.congregationSize}` : null].filter(Boolean).join(" · ")}</p>
              )}
              {a.motivation && <p className="text-sm border-l-2 border-orange-500/50 pl-3 break-words">{a.motivation}</p>}
              {a.website && (
                <a href={a.website.startsWith("http") ? a.website : `https://${a.website}`} target="_blank" rel="noopener noreferrer" className="text-sm inline-flex items-center gap-1 underline break-all">
                  {a.website} <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                </a>
              )}
              <p className="text-xs text-muted-foreground">Llegó el {fecha(a.createdAt)}</p>
              {(a.status === "pendiente" || a.status === "en_revision") && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {a.status === "pendiente" && (
                    <Button size="sm" variant="outline" className="h-10" disabled={ocupado === a.id} onClick={() => cambiar(a, "en_revision")}>En revisión</Button>
                  )}
                  <Button size="sm" className="h-10 bg-emerald-600 hover:bg-emerald-700 text-white" disabled={ocupado === a.id} onClick={() => cambiar(a, "aprobada")} data-testid={`alianza-aprobar-${a.id}`}>
                    <CheckCircle2 className="w-4 h-4 mr-1.5" aria-hidden="true" /> Aprobar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-10 text-red-700 dark:text-red-300"
                    disabled={ocupado === a.id}
                    onClick={() => confirmar({ titulo: `¿Rechazar la solicitud de ${a.churchName}?`, detalle: "Queda en la lista como rechazada. Si cambian de idea, pueden volver a pedirla.", boton: "Rechazar", accion: () => void cambiar(a, "rechazada") })}
                  >
                    Rechazar
                  </Button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

type Ficha = {
  id: number;
  userId: number;
  isApproved: boolean;
  specializations: string | null;
  theologicalEducation: string | null;
  ministryExperience: string | null;
  createdAt: string | null;
  user: { id: number; username: string; displayName: string | null; avatarUrl: string | null };
};

export function useFichas(activo: boolean) {
  return useQuery<Ficha[]>({ queryKey: ["/api/teacher-profiles"], queryFn: () => pedirJson("GET", "/api/teacher-profiles"), enabled: activo, retry: false });
}

/** Las fichas ministeriales por aprobar: cada una con su enlace y «Aprobar». */
export function FichasAdmin() {
  const q = useFichas(true);
  const qc = useQueryClient();
  const { toast } = useToast();
  const [ocupado, setOcupado] = useState<number | null>(null);
  const aprobar = async (f: Ficha) => {
    setOcupado(f.userId);
    try {
      await pedirJson("POST", `/api/teacher-profiles/${f.userId}/approve`);
      await qc.invalidateQueries({ queryKey: ["/api/teacher-profiles"] });
      toast({ title: `Ficha de ${f.user.displayName || f.user.username} aprobada`, description: "Ya aparece en el directorio de maestros." });
    } catch (e: any) {
      toast({ title: "No se pudo aprobar", description: e?.message, variant: "destructive" });
    } finally {
      setOcupado(null);
    }
  };
  if (q.isLoading) return <div className="py-10 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-orange-500" /></div>;
  if (q.error) return <p className="text-sm text-red-600 py-6" role="alert">{(q.error as Error).message}</p>;
  const pendientes = (q.data ?? []).filter((f) => !f.isApproved);
  const aprobadas = (q.data ?? []).length - pendientes.length;
  return (
    <section className="space-y-3" data-testid="admin-fichas">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2"><UserCheck className="w-5 h-5 text-orange-600" aria-hidden="true" /> Fichas ministeriales por aprobar</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Al aprobarla, la ficha aparece en el directorio de maestros. {aprobadas ? `Ya hay ${aprobadas} ${aprobadas === 1 ? "aprobada" : "aprobadas"}.` : ""}
        </p>
      </div>
      {pendientes.length === 0 ? (
        <p className="glass-card p-5 text-sm text-muted-foreground">No hay fichas esperando aprobación.</p>
      ) : (
        <ul className="grid gap-3 lg:grid-cols-2">
          {pendientes.map((f) => (
            <li key={f.id} className="glass-card p-4 space-y-2" data-testid={`ficha-${f.userId}`}>
              <div className="flex items-center gap-3">
                {f.user.avatarUrl ? (
                  <img src={f.user.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
                ) : (
                  <span className="w-10 h-10 rounded-full bg-orange-500/15 flex items-center justify-center font-semibold shrink-0">{(f.user.displayName || f.user.username).slice(0, 1).toUpperCase()}</span>
                )}
                <div className="min-w-0">
                  <p className="font-semibold truncate">{f.user.displayName || f.user.username}</p>
                  <p className="text-xs text-muted-foreground">Desde el {fecha(f.createdAt)}</p>
                </div>
              </div>
              {f.specializations && <p className="text-sm"><span className="font-medium">Especialidades: </span>{f.specializations}</p>}
              {f.theologicalEducation && <p className="text-sm line-clamp-2"><span className="font-medium">Formación: </span>{f.theologicalEducation}</p>}
              <div className="flex flex-wrap gap-2 pt-1">
                <Link href={`/ficha-ministerial/${f.userId}`}><Button size="sm" variant="outline" className="h-10">Ver la ficha</Button></Link>
                <Button size="sm" className="h-10 bg-emerald-600 hover:bg-emerald-700 text-white" disabled={ocupado === f.userId} onClick={() => aprobar(f)} data-testid={`ficha-aprobar-${f.userId}`}>
                  <CheckCircle2 className="w-4 h-4 mr-1.5" aria-hidden="true" /> Aprobar
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
