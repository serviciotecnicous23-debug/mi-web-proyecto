// Países, cargos y regiones se GUARDAN sin tilde ("Peru", "Lider de Jovenes"): los
// usuarios ya registrados y la tabla ministry_regions tienen esos valores. Para
// mostrarlos se usa withAccents(); cambiar el valor guardado rompería los datos.

const ACCENTED: Record<string, string> = {
  // Países (MINISTRY_COUNTRIES) y regiones
  "Peru": "Perú",
  "Mexico": "México",
  "Panama": "Panamá",
  "Republica Dominicana": "República Dominicana",
  "Espana": "España",
  // Cargos (MINISTRY_POSITIONS)
  "Lider de Alabanza": "Líder de Alabanza",
  "Diacono": "Diácono",
  "Lider de Jovenes": "Líder de Jóvenes",
  "Lider de Ninos": "Líder de Niños",
};

export function withAccents(value?: string | null): string {
  if (!value) return "";
  return ACCENTED[value.trim()] ?? value;
}
