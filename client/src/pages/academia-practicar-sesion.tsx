// La práctica del día (/academia/practicar/dia) y la misión de una materia (/academia/practicar/mision/:materiaId):
// se piden al servidor y se juegan en el reproductor. Al salir se vuelve a donde corresponde.
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Sparkles } from "lucide-react";
import { Layout } from "@/components/layout";
import { useTituloAcademia } from "@/components/academia/titulo";
import type { IntentoVista, PracticaDelDiaResumen } from "@shared/practicas";
import { empezarMision, practicaDelDia } from "@/components/practicas/api";
import { Reproductor } from "@/components/practicas/reproductor";

const cuando = (iso: string) => {
  const dias = Math.ceil((Date.parse(iso) - Date.now()) / 86_400_000);
  return dias <= 0 ? "hoy" : dias === 1 ? "mañana" : `en ${dias} días`;
};

export default function AcademiaPracticarSesion() {
  const params = useParams<{ materiaId?: string }>();
  const materiaId = params.materiaId;
  const esMision = !!materiaId;
  const [, irA] = useLocation();
  const qc = useQueryClient();
  useTituloAcademia(esMision ? "Misión de la materia" : "Práctica del día");
  const [intento, setIntento] = useState<IntentoVista | null>(null);
  const [vacio, setVacio] = useState<PracticaDelDiaResumen | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pedido = useRef(false);
  const volver = esMision ? `/academia/materia/${materiaId}#camino-practicas` : "/academia/practicar";

  useEffect(() => {
    if (pedido.current) return;
    pedido.current = true;
    (async () => {
      try {
        if (esMision) setIntento(await empezarMision(materiaId!));
        else {
          const r = await practicaDelDia();
          if ("vacio" in r) setVacio(r.resumen);
          else setIntento(r);
        }
      } catch (e: any) {
        setError(e?.message || "No se pudo abrir la práctica.");
      }
    })();
  }, [esMision, materiaId]);

  const salir = () => {
    void qc.invalidateQueries({ queryKey: ["practicas"] });
    void qc.invalidateQueries({ queryKey: ["academia"] });
    irA(volver);
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto px-4 py-16 text-center" data-testid="practicar-sesion">
        {error ? (
          <>
            <p className="text-lg">{error}</p>
            <Link href={volver} className="mt-4 inline-flex h-11 px-6 items-center rounded-2xl font-bold border-2 border-border">Volver</Link>
          </>
        ) : vacio ? (
          <>
            <Sparkles className="w-10 h-10 mx-auto text-orange-500" />
            <p className="font-display text-2xl font-bold mt-3">¡Estás al día!</p>
            <p className="mt-2 text-muted-foreground">
              {vacio.total > 0 ? `Hoy no te toca ninguna actividad. El próximo repaso llega ${vacio.proxima ? cuando(vacio.proxima) : "pronto"}.` : "Cuando hagas la práctica de una lección, sus actividades volverán aquí en días espaciados."}
            </p>
            <Link href="/academia/practicar" className="mt-5 inline-flex h-11 px-6 items-center rounded-2xl font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600">Volver a Practicar</Link>
          </>
        ) : (
          <p className="inline-flex items-center gap-2 text-muted-foreground"><Loader2 className="w-5 h-5 animate-spin" /> Preparando tu práctica…</p>
        )}
      </div>
      {intento && <Reproductor intento={intento} alSalir={salir} />}
    </Layout>
  );
}
