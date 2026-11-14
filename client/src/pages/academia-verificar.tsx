// La verificación pública de un documento de la academia: la abre el QR del certificado. No pide cuenta ni muestra notas
// (server/academia-documentos.ts).
import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Award, CheckCircle2, Search, ShieldAlert, XCircle } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NOMBRE_ACADEMIA, normalizarCodigo, type VerificacionAcademia } from "@shared/academia";
import { verificarDocumento } from "@/components/academia/api";

export default function AcademiaVerificar() {
  const { codigo } = useParams<{ codigo?: string }>();
  const [, navegar] = useLocation();
  const [texto, setTexto] = useState(codigo ?? "");
  const [resultado, setResultado] = useState<VerificacionAcademia | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [buscando, setBuscando] = useState(false);

  useEffect(() => {
    if (!codigo) return;
    setTexto(codigo);
    setBuscando(true);
    setResultado(null);
    setError(null);
    verificarDocumento(codigo)
      .then(setResultado)
      .catch((e) => setError(e.message))
      .finally(() => setBuscando(false));
  }, [codigo]);

  const buscar = () => {
    const c = normalizarCodigo(texto);
    if (c) navegar(`/academia/verificar/${encodeURIComponent(c)}`);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 pt-10 pb-16">
        <p className="data-label text-orange-600 dark:text-orange-300">{NOMBRE_ACADEMIA}</p>
        <h1 className="heading-display font-display text-3xl md:text-4xl mt-2 mb-6 flex items-center gap-3"><Award className="w-8 h-8 text-orange-500" /> Verificar un documento</h1>

        <div className="flex gap-2 mb-6">
          <Input value={texto} onChange={(e) => setTexto(e.target.value)} onKeyDown={(e) => e.key === "Enter" && buscar()} placeholder="AAF-XXXX-XXXX" className="text-[16px] uppercase" data-testid="verificar-codigo" />
          <Button onClick={buscar} disabled={!texto.trim() || buscando}><Search className="w-4 h-4 mr-1.5" /> Verificar</Button>
        </div>

        {buscando && <p className="text-muted-foreground">Verificando…</p>}
        {error && (
          <div className="glass-card p-5 border border-orange-500/40 flex gap-3" role="alert" data-testid="verificar-error">
            <XCircle className="w-6 h-6 text-orange-500 shrink-0" />
            <p>{error}</p>
          </div>
        )}
        {resultado && (
          <div className={`glass-card p-6 border ${resultado.valido ? "border-emerald-500/40" : "border-red-500/40"}`} data-testid="verificar-resultado" data-valido={resultado.valido}>
            {resultado.valido ? (
              <p className="font-semibold text-lg flex items-center gap-2 text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="w-6 h-6" /> Documento válido</p>
            ) : (
              <p className="font-semibold text-lg flex items-center gap-2 text-red-600"><ShieldAlert className="w-6 h-6" /> Documento revocado{resultado.revocado ? ` el ${format(new Date(resultado.revocado), "dd/MM/yyyy")}` : ""}</p>
            )}
            <dl className="mt-4 grid gap-2 text-[15px]">
              <div><dt className="text-sm text-muted-foreground">Alumno</dt><dd className="font-semibold">{resultado.nombre}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Documento</dt><dd>{resultado.documento}{resultado.honores ? ", con honores" : ""}</dd></div>
              {resultado.nivel && <div><dt className="text-sm text-muted-foreground">Nivel</dt><dd>{resultado.nivel}</dd></div>}
              <div><dt className="text-sm text-muted-foreground">Emitido</dt><dd>{format(new Date(resultado.emitido), "dd 'de' MMMM 'de' yyyy", { locale: es })}</dd></div>
              <div><dt className="text-sm text-muted-foreground">Código</dt><dd className="tracking-wider">{resultado.codigo}</dd></div>
            </dl>
            <p className="text-xs text-muted-foreground mt-5">{resultado.academia}. {resultado.aclaracion}</p>
          </div>
        )}
        {!codigo && !resultado && !error && <p className="text-muted-foreground">Escribe el código que aparece en el certificado, o escanea su código QR.</p>}
      </div>
    </Layout>
  );
}
