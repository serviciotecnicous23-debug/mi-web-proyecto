/**
 * La web dentro de la página de la radio (botón «Juegos» de radio.ministerioavivandoelfuego.com):
 * la radio abre /juegos?incrustado=radio en un marco. Mientras siga dentro de ese marco, la web
 * se muestra sin su menú ni su pie (la radio ya pone los suyos) y sin su propio reproductor de
 * radio, para que no suenen dos. Como la radio y la web son el mismo sitio, la sesión es la misma.
 *
 * Eso vale solo si la radio está en el mismo sitio que la web. Si la radio se abre por otra
 * dirección (la antigua, 40.160.2.176.sslip.io), el navegador no guarda la sesión dentro del marco
 * (la cookie es SameSite=Lax) ni deja ver la partida del teléfono: se entra, pero sin cuenta, sin
 * avance y sin Jerusalén en línea. Para ese caso están `radioDeOtroSitio()` y la radio oficial.
 */
import { RADIO_OFFICIAL_URL } from "@shared/radio";

const CLAVE = "af-incrustado";
const CLAVE_ORIGEN = "af-incrustado-origen";

function leer(clave: string): string | null {
  try {
    return sessionStorage.getItem(clave);
  } catch {
    return null;
  }
}

function guardar(clave: string, v: string | null) {
  try {
    if (v === null) sessionStorage.removeItem(clave);
    else sessionStorage.setItem(clave, v);
  } catch {
    /* sin almacenamiento en este marco: vale lo que diga la dirección */
  }
}

/** El sitio de una dirección (sus dos últimos nombres): radio.x.com y x.com son el mismo sitio. */
export function sitioDe(host: string): string {
  const h = host.toLowerCase().replace(/\.$/, "");
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(h) || h.startsWith("[") || !h.includes(".")) return h;
  return h.split(".").slice(-2).join(".");
}

/** La página de arriba del todo (la radio): por ancestorOrigins, o por de dónde se llegó. */
function origenDeArriba(pedido: boolean): string {
  try {
    const anc = (window.location as Location & { ancestorOrigins?: DOMStringList }).ancestorOrigins;
    if (anc && anc.length) return anc[anc.length - 1];
  } catch {
    /* el navegador no lo da (Firefox) */
  }
  return (pedido && document.referrer) || leer(CLAVE_ORIGEN) || "";
}

function calcular(): { radio: boolean; otroSitio: boolean } {
  if (typeof window === "undefined") return { radio: false, otroSitio: false };
  // fuera de un marco nunca hay modo incrustado (aunque el enlace traiga el parámetro)
  if (window.self === window.top) {
    guardar(CLAVE, null);
    guardar(CLAVE_ORIGEN, null);
    return { radio: false, otroSitio: false };
  }
  const pedido = new URLSearchParams(window.location.search).get("incrustado") === "radio";
  const arriba = origenDeArriba(pedido);
  if (pedido) {
    guardar(CLAVE, "radio");
    if (arriba) guardar(CLAVE_ORIGEN, arriba);
  }
  const radio = pedido || leer(CLAVE) === "radio";
  let otroSitio = false;
  if (radio && arriba) {
    try {
      otroSitio = sitioDe(new URL(arriba).hostname) !== sitioDe(window.location.hostname);
    } catch {
      otroSitio = false;
    }
  }
  return { radio, otroSitio };
}

const valor = calcular();

/** ¿La web está dentro de la radio? (se decide una vez al cargar y se recuerda en la pestaña) */
export function enLaRadio(): boolean {
  return valor.radio;
}

/** ¿La radio que nos muestra está en otro sitio (su dirección antigua)? Ahí no se guarda la sesión. */
export function radioDeOtroSitio(): boolean {
  return valor.otroSitio;
}

/** La radio oficial con el panel de los juegos ya abierto. */
export const RADIO_OFICIAL_CON_JUEGOS = `${RADIO_OFFICIAL_URL}/public/avivando_el_fuego#juegos`;
