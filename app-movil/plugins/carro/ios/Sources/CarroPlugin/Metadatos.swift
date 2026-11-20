import Foundation

/// Lo que suena ahora en el directo, como lo cuenta AzuraCast.
public struct CancionCarro: Equatable {
    public var titulo: String
    public var artista: String
    public var imagen: String?
}

enum Azuracast {
    /// Lee `/api/nowplaying/<emisora>` (un objeto o una lista con un objeto).
    static func cancion(desde datos: Data) -> CancionCarro? {
        guard let json = try? JSONSerialization.jsonObject(with: datos) else { return nil }
        let raiz: Any = (json as? [Any])?.first ?? json
        guard let o = raiz as? [String: Any], let ahora = o["now_playing"] as? [String: Any] else { return nil }
        let cancion = ahora["song"] as? [String: Any] ?? [:]
        let titulo = textoDe(cancion["title"]) ?? textoDe(cancion["text"]) ?? ""
        var artista = textoDe(cancion["artist"]) ?? ""
        if artista.isEmpty, let vivo = o["live"] as? [String: Any], (vivo["is_live"] as? Bool) == true,
           let locutor = textoDe(vivo["streamer_name"]) {
            artista = "En vivo con \(locutor)"
        }
        if artista.isEmpty { artista = conTildes(textoDe(ahora["playlist"]) ?? "") }
        if artista.isEmpty { artista = "En vivo" }
        let imagen = textoDe(cancion["art"]).flatMap { $0.lowercased().hasPrefix("https://") ? $0 : nil }
        return CancionCarro(titulo: titulo, artista: artista, imagen: imagen)
    }
}

/// Pregunta a AzuraCast qué suena cada 15 s mientras la radio suena (el servidor lo renueva cada 15 s).
/// Lo hace la parte nativa para que el carro y la pantalla bloqueada se actualicen aunque la página
/// de la app esté dormida o ni siquiera abierta (CarPlay puede abrir la app sin la pantalla del teléfono).
final class VigiaMetadatos {
    var alCambiar: ((CancionCarro) -> Void)?

    private var urls: [URL] = []
    private var reloj: Timer?
    private var tarea: URLSessionDataTask?
    private var ultima: CancionCarro?

    func empezar(_ nuevas: [URL]) {
        guard !nuevas.isEmpty else {
            detener()
            return
        }
        if nuevas == urls, reloj != nil { return }
        detener()
        urls = nuevas
        ultima = nil
        consultar(0)
        let reloj = Timer(timeInterval: 15, repeats: true) { [weak self] _ in self?.consultar(0) }
        RunLoop.main.add(reloj, forMode: .common)
        self.reloj = reloj
    }

    func detener() {
        reloj?.invalidate()
        reloj = nil
        tarea?.cancel()
        tarea = nil
        urls = []
    }

    private func consultar(_ indice: Int) {
        guard indice < urls.count else { return }
        var pedido = URLRequest(url: urls[indice], cachePolicy: .reloadIgnoringLocalCacheData, timeoutInterval: 8)
        pedido.setValue("application/json", forHTTPHeaderField: "Accept")
        tarea?.cancel()
        let tarea = URLSession.shared.dataTask(with: pedido) { [weak self] datos, respuesta, _ in
            DispatchQueue.main.async {
                guard let self else { return }
                if let datos, (respuesta as? HTTPURLResponse)?.statusCode == 200, let cancion = Azuracast.cancion(desde: datos) {
                    if cancion != self.ultima {
                        self.ultima = cancion
                        self.alCambiar?(cancion)
                    }
                } else if indice + 1 < self.urls.count {
                    // El servidor principal no respondió: se pregunta al de respaldo.
                    self.consultar(indice + 1)
                }
            }
        }
        self.tarea = tarea
        tarea.resume()
    }
}
