import { useEffect, useRef, useState } from "react";
import { renderAsync } from "docx-preview";
import { Loader2 } from "lucide-react";
import { loadBytes } from "../file-bytes";

/** Quita lo que no debe correr dentro de la web (scripts, marcos) y abre los enlaces aparte. */
function tidy(container: HTMLElement) {
  container.querySelectorAll("script, iframe, object, embed, form").forEach((n) => n.remove());
  container.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((a) => {
    const href = a.getAttribute("href") || "";
    if (href.startsWith("#")) return;
    if (!/^(https?:|mailto:)/i.test(href)) a.removeAttribute("href");
    else {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
  });
}

/** Documento de Word (.docx) dibujado aquí mismo, con su formato, a lo ancho de la pantalla. */
export default function DocxView({ url, onError }: { url: string; onError: (message: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const el = ref.current;
    if (!el) return;
    loadBytes(url)
      .then((buf) =>
        renderAsync(buf, el, undefined, {
          className: "docx",
          inWrapper: false,
          ignoreWidth: true,
          ignoreHeight: true,
          breakPages: true,
          renderHeaders: true,
          renderFooters: true,
          renderFootnotes: true,
          renderEndnotes: true,
          useBase64URL: true,
        }),
      )
      .then(() => {
        if (!alive) return;
        tidy(el);
        setLoading(false);
      })
      .catch(() => alive && onError("No se pudo mostrar este documento de Word aquí."));
    return () => {
      alive = false;
    };
  }, [url, onError]);

  return (
    <div className="docx-view">
      {loading && <div className="viewer__loading"><Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" /> Abriendo el documento…</div>}
      <div ref={ref} className="docx-view__page" />
    </div>
  );
}
