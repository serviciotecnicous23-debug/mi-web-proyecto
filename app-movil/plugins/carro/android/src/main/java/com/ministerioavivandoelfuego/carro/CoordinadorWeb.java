package com.ministerioavivandoelfuego.carro;

import android.webkit.WebView;
import androidx.webkit.JavaScriptReplyProxy;
import androidx.webkit.WebViewCompat;
import androidx.webkit.WebViewFeature;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Para la app del ministerio, cuya página (la web) también tiene audio: la radio en un marco y
 * «Escuchar la lección». Nunca deben sonar dos cosas a la vez:
 * - si empieza a sonar algo en la página (en cualquier marco), se pausa el reproductor nativo;
 * - si empieza el nativo (desde Android Auto o la notificación), se pausa todo lo de la página.
 */
final class CoordinadorWeb {
    static final String NOMBRE = "carroWeb";

    /** Se pone en cada marco antes de que cargue la página. */
    static final String GUION = "(function () {\n"
        + "  if (window.__carroWeb || typeof carroWeb === 'undefined') return;\n"
        + "  window.__carroWeb = true;\n"
        + "  var medios = [];\n"
        + "  var avisar = function (el) {\n"
        + "    if (el && medios.indexOf(el) < 0) medios.push(el);\n"
        + "    try { carroWeb.postMessage('play'); } catch (e) {}\n"
        + "  };\n"
        + "  var tocar = HTMLMediaElement.prototype.play;\n"
        + "  HTMLMediaElement.prototype.play = function () { avisar(this); return tocar.apply(this, arguments); };\n"
        + "  document.addEventListener('play', function (e) { avisar(e.target); }, true);\n"
        + "  carroWeb.addEventListener('message', function (e) {\n"
        + "    if (e.data !== 'pausar') return;\n"
        + "    medios.forEach(function (m) { try { m.pause(); } catch (x) {} });\n"
        + "    document.querySelectorAll('audio,video').forEach(function (m) { try { m.pause(); } catch (x) {} });\n"
        + "  });\n"
        + "})();";

    private final List<JavaScriptReplyProxy> marcos = new CopyOnWriteArrayList<>();

    CoordinadorWeb(WebView pagina, Set<String> origenes, Runnable alSonarLaWeb) {
        Set<String> reglas = origenes.isEmpty() ? Collections.singleton("*") : origenes;
        try {
            if (WebViewFeature.isFeatureSupported(WebViewFeature.WEB_MESSAGE_LISTENER)) {
                WebViewCompat.addWebMessageListener(pagina, NOMBRE, reglas, (vista, mensaje, origen, esPrincipal, respuesta) -> {
                    if (!"play".equals(mensaje.getData())) return;
                    if (!marcos.contains(respuesta)) marcos.add(respuesta);
                    alSonarLaWeb.run();
                });
            }
            if (WebViewFeature.isFeatureSupported(WebViewFeature.DOCUMENT_START_SCRIPT)) {
                WebViewCompat.addDocumentStartJavaScript(pagina, GUION, reglas);
            }
        } catch (RuntimeException ignorado) {
            // Un WebView muy viejo: sin coordinar (cada uno con su botón de pausa).
        }
    }

    /** Empezó a sonar lo nativo: se pausa todo lo que sonaba en la página. */
    void pausarWeb() {
        for (JavaScriptReplyProxy marco : marcos) {
            try {
                marco.postMessage("pausar");
            } catch (RuntimeException e) {
                marcos.remove(marco);
            }
        }
    }
}
