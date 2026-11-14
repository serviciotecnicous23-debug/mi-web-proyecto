/**
 * Los reportes en CSV del panel de seguimiento (server/academia-direccion.ts). Aparte, sin base de datos, para probarlo.
 *
 * - UTF-8 con BOM y renglones de Windows: Excel lo abre con las tildes bien.
 * - Una celda que empieza con = + - @ (o un tabulador) se escribe como texto, con un apóstrofo delante, para que una hoja
 *   de cálculo no la tome como fórmula (la «inyección de CSV» de OWASP).
 */
export function celda(v: unknown): string {
  let s = v == null ? "" : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return /[",\r\n;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

export function aCsv(filas: unknown[][]): string {
  return "﻿" + filas.map((f) => f.map(celda).join(",")).join("\r\n") + "\r\n";
}
