import WebKit

/// Para la app del ministerio, cuya página (la web) también tiene audio: la radio en un marco y
/// «Escuchar la lección». Nunca deben sonar dos cosas a la vez:
/// - si empieza a sonar algo en la página (en cualquier marco), se pausa el reproductor nativo;
/// - si empieza el nativo (desde CarPlay o la pantalla bloqueada), se pausa todo lo de la página.
final class CoordinadorWeb: NSObject, WKScriptMessageHandler {
    static let nombre = "carroWeb"

    /// Se pone en todos los marcos antes de que cargue la página.
    static let guion = """
    (function () {
      if (window.__carroWeb) return;
      window.__carroWeb = true;
      var avisar = function () {
        try { window.webkit.messageHandlers.carroWeb.postMessage('play'); } catch (e) {}
      };
      var tocar = HTMLMediaElement.prototype.play;
      HTMLMediaElement.prototype.play = function () {
        avisar();
        return tocar.apply(this, arguments);
      };
      document.addEventListener('play', avisar, true);
    })();
    """

    private weak var pagina: WKWebView?

    init(pagina: WKWebView) {
        self.pagina = pagina
        super.init()
        let contenido = pagina.configuration.userContentController
        contenido.addUserScript(WKUserScript(source: CoordinadorWeb.guion, injectionTime: .atDocumentStart, forMainFrameOnly: false))
        contenido.add(Debil(self), name: CoordinadorWeb.nombre)
        Reproductor.shared.alEmpezar = { [weak self] in
            self?.pagina?.pauseAllMediaPlayback(completionHandler: nil)
        }
    }

    func userContentController(_ controlador: WKUserContentController, didReceive mensaje: WKScriptMessage) {
        guard mensaje.name == CoordinadorWeb.nombre else { return }
        // El oyente le dio play a algo de la página: se calla lo nativo.
        DispatchQueue.main.async {
            if Reproductor.shared.estaSonando { Reproductor.shared.pausar() }
        }
    }
}

/// WKUserContentController retiene a quien recibe los mensajes: así no se queda en memoria para siempre.
private final class Debil: NSObject, WKScriptMessageHandler {
    weak var destino: WKScriptMessageHandler?

    init(_ destino: WKScriptMessageHandler) {
        self.destino = destino
    }

    func userContentController(_ controlador: WKUserContentController, didReceive mensaje: WKScriptMessage) {
        destino?.userContentController(controlador, didReceive: mensaje)
    }
}
