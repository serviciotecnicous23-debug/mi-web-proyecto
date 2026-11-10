/**
 * La web dentro de la página de la radio (botón «Juegos» de radio.ministerioavivandoelfuego.com):
 * la radio abre /juegos?incrustado=radio en un marco. Mientras siga dentro de ese marco, la web
 * se muestra sin su menú ni su pie (la radio ya pone los suyos) y sin su propio reproductor de
 * radio, para que no suenen dos. Como la radio y la web son el mismo sitio, la sesión es la misma.
 */
const CLAVE = "af-incrustado";

function calcular(): boolean {
  if (typeof window === "undefined") return false;
  try {
    // fuera de un marco nunca hay modo incrustado (aunque el enlace traiga el parámetro)
    if (window.self === window.top) {
      sessionStorage.removeItem(CLAVE);
      return false;
    }
    if (new URLSearchParams(window.location.search).get("incrustado") === "radio") sessionStorage.setItem(CLAVE, "radio");
    return sessionStorage.getItem(CLAVE) === "radio";
  } catch {
    return false;
  }
}

const valor = calcular();

/** ¿La web está dentro de la radio? (se decide una vez al cargar y se recuerda en la pestaña) */
export function enLaRadio(): boolean {
  return valor;
}
