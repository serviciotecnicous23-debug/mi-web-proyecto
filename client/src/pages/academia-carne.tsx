// El carné digital de la academia: acredita la matrícula y se verifica con su QR (server/academia-matricula.ts).
// Las imágenes y el PDF se hacen en el servidor (server/academia-carne.ts): la página solo los muestra y los enlaza, así
// que se descargan con su nombre en cualquier teléfono (también en la web instalada como app y en los navegadores de
// Facebook, Instagram o WhatsApp) y la página no dibuja nada al abrirse.
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Download, FileText, IdCard, ImageDown, Info, RotateCw, Share2, ShieldCheck } from "lucide-react";
import { Layout } from "@/components/layout";
import { useTituloAcademia } from "@/components/academia/titulo";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { loginUrl } from "@/lib/login-redirect";
import type { CarneVista } from "@shared/academia";
import { useCarne } from "@/components/academia/api";
import { Cargando, PantallaCerrada } from "@/components/academia/ui";
import { FotoCarne } from "@/components/academia/foto-carne";
import { entornoDeDescarga } from "@/components/academia/descargas";

const iniciales = (nombre: string) =>
  nombre
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");

/**
 * Las dos caras como archivos, para «Guardar en el teléfono» (compartir → Guardar imagen). Se preparan apenas se ven
 * las imágenes (salen de la caché del navegador), así el botón responde al toque: el iPhone no deja compartir después
 * de esperar una descarga.
 */
function useCarasParaCompartir(c: CarneVista, activo: boolean) {
  const [archivos, setArchivos] = useState<File[] | null>(null);
  useEffect(() => {
    setArchivos(null);
    if (!activo || typeof navigator.canShare !== "function") return;
    let vivo = true;
    Promise.all(
      [c.archivos.frente, c.archivos.reverso].map((u) =>
        fetch(u, { credentials: "same-origin" }).then((r) => {
          if (!r.ok) throw new Error(String(r.status));
          return r.blob();
        }),
      ),
    )
      .then(([f, r]) => {
        const lista = [
          new File([f], `${c.archivos.nombre}-frente.png`, { type: "image/png" }),
          new File([r], `${c.archivos.nombre}-reverso.png`, { type: "image/png" }),
        ];
        if (vivo && navigator.canShare({ files: lista })) setArchivos(lista);
      })
      .catch(() => {
        // (sin compartir: quedan las descargas)
      });
    return () => {
      vivo = false;
    };
  }, [c.archivos.frente, c.archivos.reverso, c.archivos.nombre, activo]);
  return archivos;
}

/** Una cara del carné tal como se descarga (la imagen del servidor), con su espacio reservado mientras llega. */
function Cara({ src, alt, testid, tarde }: { src: string; alt: string; testid: string; tarde?: boolean }) {
  const [intento, setIntento] = useState(0);
  const [estado, setEstado] = useState<"cargando" | "lista" | "error">("cargando");
  useEffect(() => {
    setIntento(0);
    setEstado("cargando");
  }, [src]);
  const url = intento ? `${src}&r=${intento}` : src;
  return (
    <div className="relative aspect-[1012/638] w-full rounded-2xl overflow-hidden bg-[#2a1207] shadow-lg">
      {estado !== "error" && (
        <img
          src={url}
          width={1012}
          height={638}
          alt={alt}
          loading={tarde ? "lazy" : "eager"}
          decoding="async"
          onLoad={() => setEstado("lista")}
          onError={() => setEstado("error")}
          className="absolute inset-0 w-full h-full"
          data-testid={testid}
        />
      )}
      {estado === "cargando" && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#160b05] to-[#3b1606]" aria-hidden="true" />}
      {estado === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center text-orange-100" role="alert">
          <p className="text-sm">No se pudo cargar esta cara del carné.</p>
          <Button
            size="sm"
            variant="outline"
            className="bg-transparent text-orange-100 border-orange-300/60 hover:bg-orange-900/40"
            onClick={() => {
              setIntento((i) => i + 1);
              setEstado("cargando");
            }}
          >
            <RotateCw className="w-4 h-4 mr-1.5" /> Volver a intentar
          </Button>
        </div>
      )}
    </div>
  );
}

export default function AcademiaCarne() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const q = useCarne();
  useTituloAcademia("Mi carné");
  const [donde] = useState(entornoDeDescarga);
  const c = q.data;
  const caras = useCarasParaCompartir(
    c ?? ({ archivos: { frente: "", reverso: "", pdf: "", nombre: "" } } as unknown as CarneVista),
    !!c && donde.tactil,
  );
  if (q.isLoading) return <Cargando />;
  if (q.error?.status === 403) return <PantallaCerrada mensaje={q.error.message} />;
  if (!c) {
    const sinMatricula = q.error?.status === 409;
    const sinSesion = q.error?.status === 401;
    return (
      <Layout>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <IdCard className="w-12 h-12 mx-auto text-orange-500" />
          <p className="text-lg mt-4 mb-5">{sinMatricula ? "Tu carné se entrega al inscribirte en la academia." : q.error?.message ?? "No se pudo cargar tu carné."}</p>
          {sinMatricula && <Link href="/academia/inscripcion?volver=%2Facademia%2Fcarne"><Button className="fire-btn-primary h-12 px-7">Inscribirme en la academia</Button></Link>}
          {sinSesion && <a href={loginUrl("/academia/carne")}><Button className="fire-btn-primary h-12 px-7">Entrar</Button></a>}
        </div>
      </Layout>
    );
  }
  const { archivos } = c;
  // en el iPhone con la web instalada, la descarga se abre aparte (con su botón «Listo» para volver)
  const aparte = donde.iosInstalada ? { target: "_blank", rel: "noopener" } : {};
  const compartir = async () => {
    if (!caras) return;
    try {
      await navigator.share({ files: caras, title: "Mi carné de estudiante" });
    } catch (e: any) {
      if (e?.name !== "AbortError") toast({ title: "No se pudo compartir", description: "Usa los botones de descarga o mantén el dedo sobre la imagen.", variant: "destructive" });
    }
  };
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-16">
        <Link href="/academia" className="text-sm text-muted-foreground hover:underline inline-flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Academia</Link>
        <h1 className="heading-display font-display text-3xl md:text-4xl mt-4 mb-2 flex items-center gap-3"><IdCard className="w-8 h-8 text-orange-500" /> Mi carné</h1>
        <p className="text-sm text-muted-foreground mb-5">Tu carné de estudiante de la academia, con su código QR para verificarlo.</p>
        {donde.enApp && (
          <div className="rounded-xl border border-amber-500/40 bg-amber-50 dark:bg-amber-950/40 p-3 text-sm mb-4 flex gap-2.5" role="note" data-testid="carne-aviso-app">
            <Info className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
            <p>
              Estás en el navegador de una app (Facebook, Instagram, WhatsApp…), donde a veces las descargas no funcionan. Si no se descarga, abre
              esta página en Chrome o Safari: toca el menú (⋮ o ···) y elige «Abrir en el navegador». También puedes mantener el dedo sobre la
              imagen y guardarla.
            </p>
          </div>
        )}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button asChild className="fire-btn-primary">
            <a href={archivos.pdf} download={`${archivos.nombre}.pdf`} {...aparte} data-testid="carne-pdf">
              <Download className="w-4 h-4 mr-1.5" /> Descargar PDF para imprimir
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={`${archivos.frente}&descargar=1`} download={`${archivos.nombre}-frente.png`} {...aparte} data-testid="carne-imagen">
              <ImageDown className="w-4 h-4 mr-1.5" /> Imagen del frente
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={`${archivos.reverso}&descargar=1`} download={`${archivos.nombre}-reverso.png`} {...aparte} data-testid="carne-imagen-reverso">
              <ImageDown className="w-4 h-4 mr-1.5" /> Imagen del reverso
            </a>
          </Button>
          {caras && (
            <Button variant="outline" onClick={compartir} data-testid="carne-compartir">
              <Share2 className="w-4 h-4 mr-1.5" /> Guardar en el teléfono
            </Button>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <figure>
            <Cara src={archivos.frente} alt={`Frente del carné de ${c.nombre}`} testid="carne-frente" />
            <figcaption className="text-xs text-muted-foreground mt-1.5 text-center">Frente</figcaption>
          </figure>
          <figure>
            <Cara src={archivos.reverso} alt="Reverso del carné" testid="carne-reverso" tarde />
            <figcaption className="text-xs text-muted-foreground mt-1.5 text-center">Reverso</figcaption>
          </figure>
        </div>
        <p className="text-xs text-muted-foreground mt-3 flex items-start gap-1.5">
          <FileText className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>
            Para imprimirlo, descarga el PDF y ábrelo: es una hoja carta con el frente y el reverso a tamaño real (85,6 × 54 mm, como una tarjeta), con
            marcas para recortar. Imprímelo al 100 %. En el teléfono también puedes mantener el dedo sobre la imagen y elegir «Guardar imagen».
          </span>
        </p>
        <div className="max-w-[540px] mt-8">
          <FotoCarne foto={c.foto} propia={c.fotoPropia} iniciales={iniciales(c.nombre)} alGuardar={() => void qc.invalidateQueries({ queryKey: ["academia"] })} />
        </div>
        <p className="text-sm text-muted-foreground mt-6 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" />
          <span>
            El QR lleva a <Link href={`/academia/verificar/${c.codigo}`} className="underline">la verificación de tu carné</Link>: muestra tu nombre, tu matrícula y
            tu estatus de hoy, sin notas.
          </span>
        </p>
      </div>
    </Layout>
  );
}
