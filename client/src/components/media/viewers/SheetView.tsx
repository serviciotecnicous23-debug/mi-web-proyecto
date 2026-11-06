import { useEffect, useState } from "react";
import readXlsxFile from "read-excel-file/browser";
import { Loader2 } from "lucide-react";
import { loadBytes, loadText } from "../file-bytes";

type Cell = string | number | boolean | Date | null;
type SheetRows = { name: string; rows: Cell[][] };

const MAX_ROWS = 2000;

/** CSV sencillo: comillas, comas o punto y coma (Excel en español usa ";"). */
export function parseCsv(text: string): Cell[][] {
  const first = text.split(/\r?\n/, 1)[0] || "";
  const sep = (first.match(/;/g) || []).length > (first.match(/,/g) || []).length ? ";" : first.includes("\t") ? "\t" : ",";
  const rows: Cell[][] = [];
  let row: Cell[] = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === sep) {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      if (rows.length >= MAX_ROWS) break;
    } else cell += ch;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

function show(value: Cell): string {
  if (value == null) return "";
  if (value instanceof Date) return value.toLocaleDateString("es");
  if (typeof value === "number") return value.toLocaleString("es");
  if (typeof value === "boolean") return value ? "Sí" : "No";
  return String(value);
}

/** Hoja de cálculo (.xlsx o .csv) como tabla, con pestañas si trae varias hojas. */
export default function SheetView({ url, csv, onError }: { url: string; csv?: boolean; onError: (message: string) => void }) {
  const [sheets, setSheets] = useState<SheetRows[] | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let alive = true;
    (csv
      ? loadText(url).then((t) => [{ name: "Tabla", rows: parseCsv(t) }])
      : loadBytes(url).then(async (buf) => (await readXlsxFile(buf)).map((s) => ({ name: s.sheet, rows: s.data.slice(0, MAX_ROWS) as Cell[][] }))))
      .then((list) => alive && setSheets(list))
      .catch(() => alive && onError("No se pudo leer esta hoja de cálculo aquí."));
    return () => {
      alive = false;
    };
  }, [url, csv, onError]);

  if (!sheets) return <div className="viewer__loading"><Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" /> Abriendo la hoja…</div>;
  const sheet = sheets[active] || sheets[0];
  const [head, ...body] = sheet?.rows || [];
  const cols = Math.max(0, ...(sheet?.rows || []).map((r) => r.length));
  return (
    <div className="sheet-view">
      {sheets.length > 1 && (
        <div className="sheet-view__tabs" role="tablist" aria-label="Hojas">
          {sheets.map((s, i) => (
            <button key={s.name + i} type="button" role="tab" aria-selected={i === active} onClick={() => setActive(i)} className={i === active ? "is-active" : ""}>
              {s.name}
            </button>
          ))}
        </div>
      )}
      {!head ? (
        <p className="viewer__notice">Esta hoja está vacía.</p>
      ) : (
        <div className="sheet-view__scroll">
          <table>
            <thead>
              <tr>{Array.from({ length: cols }, (_, i) => <th key={i}>{show(head[i] ?? null)}</th>)}</tr>
            </thead>
            <tbody>
              {body.map((r, ri) => (
                <tr key={ri}>{Array.from({ length: cols }, (_, ci) => <td key={ci}>{show(r[ci] ?? null)}</td>)}</tr>
              ))}
            </tbody>
          </table>
          {sheet.rows.length >= MAX_ROWS && <p className="viewer__notice">Se muestran las primeras {MAX_ROWS} filas. Descarga el archivo para verlo completo.</p>}
        </div>
      )}
    </div>
  );
}
