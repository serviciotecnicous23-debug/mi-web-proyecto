/**
 * La ficha de inscripción en la academia (docs/academia.md, «La inscripción»): sus campos, sus opciones y su
 * validación. Es la misma en el navegador (el asistente de inscripción marca los errores al instante) y en el servidor
 * (que la vuelve a comprobar antes de guardarla). No importa nada en tiempo de ejecución.
 */
import type { MatriculaInfo } from "./academia";

export const PAISES = [
  "Estados Unidos", "México", "Guatemala", "Honduras", "El Salvador", "Nicaragua", "Costa Rica", "Panamá", "Cuba",
  "Puerto Rico", "República Dominicana", "Venezuela", "Colombia", "Ecuador", "Perú", "Bolivia", "Chile", "Argentina",
  "Paraguay", "Uruguay", "Brasil", "España", "Canadá", "Otro",
] as const;

type Opcion = { id: string; texto: string };

export const TIEMPO_FE: readonly Opcion[] = [
  { id: "conociendo", texto: "Estoy conociendo la fe" },
  { id: "menos-1", texto: "Menos de 1 año" },
  { id: "1-3", texto: "De 1 a 3 años" },
  { id: "3-10", texto: "De 3 a 10 años" },
  { id: "mas-10", texto: "Más de 10 años" },
];

export const BAUTISMO: readonly Opcion[] = [
  { id: "si", texto: "Sí, ya me bauticé" },
  { id: "no", texto: "Todavía no" },
  { id: "quiero", texto: "Quiero bautizarme" },
];

export const COMO_CONOCIO: readonly Opcion[] = [
  { id: "iglesia", texto: "Mi iglesia" },
  { id: "amigo", texto: "Un amigo o un familiar" },
  { id: "redes", texto: "Las redes sociales" },
  { id: "radio", texto: "La radio" },
  { id: "web", texto: "La web del ministerio" },
  { id: "otro", texto: "Otro" },
];

export const etiquetaDe = (lista: readonly Opcion[], id: string) => lista.find((o) => o.id === id)?.texto ?? "";

/** La edad mínima para inscribirse por su cuenta (con la fecha de nacimiento, que es opcional). */
export const EDAD_MINIMA = 13;

export const LIMITES = { nombre: 60, ciudad: 60, telefono: 24, iglesia: 80, pastor: 80, ministerio: 120, espera: 500 } as const;

export type FichaInscripcion = {
  /** Nombres y apellidos tal como saldrán en los certificados. */
  nombres: string;
  apellidos: string;
  pais: string;
  ciudad: string;
  /** Teléfono o WhatsApp (opcional). */
  telefono: string;
  /** AAAA-MM-DD o vacío (opcional). */
  nacimiento: string;
  /** Una iglesia aliada del ministerio (o null). */
  iglesiaId: number | null;
  /** Otra iglesia, si no es aliada. */
  iglesiaOtra: string;
  pastor: string;
  tiempoFe: string;
  bautismo: string;
  ministerio: string;
  comoConocio: string;
  /** Qué espera aprender. */
  espera: string;
};

export const FICHA_VACIA: FichaInscripcion = {
  nombres: "", apellidos: "", pais: "", ciudad: "", telefono: "", nacimiento: "", iglesiaId: null, iglesiaOtra: "", pastor: "",
  tiempoFe: "", bautismo: "", ministerio: "", comoConocio: "", espera: "",
};

/** La ficha como la devuelve el servidor: con el nombre de la iglesia aliada, la foto del carné y sus fechas. */
export type FichaVista = FichaInscripcion & { iglesiaNombre: string | null; foto: string | null; creada: string; actualizada: string };

export type IglesiaOpcion = { id: number; nombre: string; lugar: string };

/** Lo que pide el asistente de inscripción (GET /api/academia/inscripcion). */
export type InscripcionEstado = {
  ficha: FichaVista | null;
  /** La matrícula (null si todavía no se inscribió). */
  matricula: MatriculaInfo | null;
  iglesias: IglesiaOpcion[];
  /** Lo que ya se sabe de la cuenta, para no escribirlo dos veces. */
  sugerida: FichaInscripcion;
  /** Su nombre ya figura en certificados: solo lo corrige la Dirección académica. */
  nombreFijo: boolean;
  reglamento: string;
};

export type ErroresFicha = Partial<Record<keyof FichaInscripcion, string>>;

const PARTICULAS = new Set(["de", "del", "la", "las", "los", "y", "e", "da", "das", "do", "dos", "van", "von"]);

/** «luis alberto» o «LUIS ALBERTO» → «Luis Alberto» (si viene con mayúsculas y minúsculas, se respeta). */
export function nombrePropio(s: string): string {
  const limpio = s.normalize("NFC").replace(/\s+/g, " ").trim();
  const letras = limpio.replace(/[^\p{L}]/gu, "");
  if (letras.length < 2) return limpio;
  const minusculas = letras === letras.toLocaleLowerCase("es");
  const mayusculas = letras === letras.toLocaleUpperCase("es");
  if (!minusculas && !mayusculas) return limpio;
  return limpio
    .toLocaleLowerCase("es")
    .split(" ")
    .map((p, i) => (i > 0 && PARTICULAS.has(p) ? p : p.replace(/(^|[-'’])(\p{L})/gu, (_, antes: string, letra: string) => antes + letra.toLocaleUpperCase("es"))))
    .join(" ");
}

/** Nombres y apellidos juntos: el nombre de los documentos. */
export const nombreCompleto = (f: Pick<FichaInscripcion, "nombres" | "apellidos">) => `${f.nombres} ${f.apellidos}`.replace(/\s+/g, " ").trim();

/**
 * Un nombre de la cuenta («Luis Rodríguez») repartido en nombres y apellidos, como sugerencia: con 3 palabras se
 * supone un nombre y dos apellidos; con 4, dos y dos. La persona lo corrige en la ficha.
 */
export function repartirNombre(nombre: string): { nombres: string; apellidos: string } {
  const ps = nombrePropio(nombre).split(" ").filter(Boolean);
  if (ps.length < 2 || ps.length > 4) return { nombres: ps.join(" "), apellidos: "" };
  const n = ps.length === 4 ? 2 : 1;
  return { nombres: ps.slice(0, n).join(" "), apellidos: ps.slice(n).join(" ") };
}

const CONTROL = /[\u0000-\u001f\u007f]/g;
const linea = (v: unknown, max: number) => (typeof v === "string" ? v.normalize("NFC").replace(CONTROL, " ").replace(/\s+/g, " ").trim().slice(0, max) : "");
const parrafo = (v: unknown, max: number) =>
  typeof v === "string"
    ? v.normalize("NFC").replace(/\r\n?/g, "\n").replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim().slice(0, max)
    : "";
const NOMBRE_VALIDO = /^\p{L}[\p{L}\p{M}'’. -]*$/u;

/** La edad cumplida en una fecha. */
export function edadEn(nacimiento: string, hoy: Date): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(nacimiento);
  if (!m) return null;
  const [a, mes, dia] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const f = new Date(Date.UTC(a, mes - 1, dia));
  if (f.getUTCFullYear() !== a || f.getUTCMonth() !== mes - 1 || f.getUTCDate() !== dia) return null;
  let edad = hoy.getUTCFullYear() - a;
  if (hoy.getUTCMonth() + 1 < mes || (hoy.getUTCMonth() + 1 === mes && hoy.getUTCDate() < dia)) edad--;
  return edad;
}

/**
 * Limpia y valida la ficha. Obligatorios: nombres, apellidos, país y el tiempo en la fe. Lo demás es opcional, pero si
 * se escribe tiene que tener sentido (un teléfono con sus dígitos, una fecha real).
 */
export function validarFicha(entrada: unknown, hoy = new Date()): { ok: true; ficha: FichaInscripcion } | { ok: false; errores: ErroresFicha } {
  const e = (entrada && typeof entrada === "object" ? entrada : {}) as Record<string, unknown>;
  const errores: ErroresFicha = {};
  const nombre = (campo: "nombres" | "apellidos", que: string) => {
    const v = nombrePropio(linea(e[campo], LIMITES.nombre + 20));
    if (!v) errores[campo] = `Escribe tus ${que}.`;
    else if (v.length < 2) errores[campo] = `Tus ${que} parecen incompletos.`;
    else if (v.length > LIMITES.nombre) errores[campo] = `Usa hasta ${LIMITES.nombre} letras.`;
    else if (!NOMBRE_VALIDO.test(v)) errores[campo] = "Usa solo letras (sin números ni símbolos).";
    return v;
  };
  const nombres = nombre("nombres", "nombres");
  const apellidos = nombre("apellidos", "apellidos");

  const pais = linea(e.pais, 40);
  if (!pais) errores.pais = "Elige tu país.";
  else if (!(PAISES as readonly string[]).includes(pais)) errores.pais = "Elige un país de la lista.";

  const ciudad = linea(e.ciudad, LIMITES.ciudad);

  const telefono = linea(e.telefono, LIMITES.telefono + 10);
  if (telefono) {
    const digitos = telefono.replace(/\D/g, "").length;
    if (telefono.length > LIMITES.telefono || !/^[+(\d][\d\s().-]*$/.test(telefono) || digitos < 7 || digitos > 15) {
      errores.telefono = "Escribe un teléfono válido, con su código de país si es de fuera (por ejemplo, +1 512 555 0123).";
    }
  }

  const nacimiento = linea(e.nacimiento, 10);
  if (nacimiento) {
    const edad = edadEn(nacimiento, hoy);
    if (edad == null || Number(nacimiento.slice(0, 4)) < 1900) errores.nacimiento = "Escribe una fecha válida.";
    else if (edad < 0) errores.nacimiento = "Esa fecha todavía no llega.";
    else if (edad < EDAD_MINIMA) errores.nacimiento = `Para inscribirte por tu cuenta necesitas tener ${EDAD_MINIMA} años o más. Pide a tu papá, a tu mamá o a tu maestro que te acompañe.`;
    else if (edad > 110) errores.nacimiento = "Revisa el año de la fecha.";
  }

  const id = Number(e.iglesiaId);
  const iglesiaId = Number.isInteger(id) && id > 0 ? id : null;
  const iglesiaOtra = iglesiaId ? "" : linea(e.iglesiaOtra, LIMITES.iglesia);
  const pastor = nombrePropio(linea(e.pastor, LIMITES.pastor));

  const opcion = (campo: "tiempoFe" | "bautismo" | "comoConocio", lista: readonly Opcion[]) => {
    const v = linea(e[campo], 20);
    if (v && !lista.some((o) => o.id === v)) errores[campo] = "Elige una opción de la lista.";
    return lista.some((o) => o.id === v) ? v : "";
  };
  const tiempoFe = opcion("tiempoFe", TIEMPO_FE);
  if (!tiempoFe && !errores.tiempoFe) errores.tiempoFe = "Elige cuánto tiempo llevas en la fe.";
  const bautismo = opcion("bautismo", BAUTISMO);
  const comoConocio = opcion("comoConocio", COMO_CONOCIO);

  const ministerio = linea(e.ministerio, LIMITES.ministerio);
  const espera = parrafo(e.espera, LIMITES.espera);

  if (Object.keys(errores).length) return { ok: false, errores };
  return {
    ok: true,
    ficha: { nombres, apellidos, pais, ciudad, telefono, nacimiento, iglesiaId, iglesiaOtra, pastor, tiempoFe, bautismo, ministerio, comoConocio, espera },
  };
}

/** El país guardado en la cuenta (sin tildes: «Peru», «Espana») como está en la lista. */
export function paisDeCuenta(pais: string | null | undefined): string {
  if (!pais) return "";
  const llano = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
  return PAISES.find((p) => llano(p) === llano(pais)) ?? "";
}
