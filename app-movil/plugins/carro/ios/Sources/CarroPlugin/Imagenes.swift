import UIKit

/// Carátulas para CarPlay y la pantalla bloqueada: de internet (https) o de la web que va dentro de la app.
final class Imagenes {
    static let shared = Imagenes()

    private let guardadas = NSCache<NSString, UIImage>()
    private var esperando: [String: [(UIImage?) -> Void]] = [:]

    /// El logo de la app, para lo que no trae carátula propia.
    static let deLaApp: UIImage? = local("icons/icon-512.png") ?? local("icon.png") ?? UIImage(named: "AppIcon")

    /// Una imagen de la web que va dentro de la app (Capacitor la copia en la carpeta `public`).
    static func local(_ ruta: String) -> UIImage? {
        guard let base = Bundle.main.resourceURL else { return nil }
        let limpia = ruta.hasPrefix("./") ? String(ruta.dropFirst(2)) : (ruta.hasPrefix("/") ? String(ruta.dropFirst()) : ruta)
        for carpeta in ["public/", ""] {
            let url = base.appendingPathComponent(carpeta + limpia)
            if let imagen = UIImage(contentsOfFile: url.path) { return imagen }
        }
        return nil
    }

    /// La que ya se tiene a mano (sin esperar la red): la guardada, la local o el logo.
    func inmediata(_ ruta: String?) -> UIImage? {
        guard let ruta else { return Imagenes.deLaApp }
        if let imagen = guardadas.object(forKey: ruta as NSString) { return imagen }
        if !ruta.lowercased().hasPrefix("https://"), let imagen = Imagenes.local(ruta) {
            guardadas.setObject(imagen, forKey: ruta as NSString)
            return imagen
        }
        return Imagenes.deLaApp
    }

    /// Trae la imagen (de internet si hace falta) y responde en el hilo principal.
    func cargar(_ ruta: String?, listo: @escaping (UIImage?) -> Void) {
        guard let ruta else {
            listo(Imagenes.deLaApp)
            return
        }
        if let imagen = guardadas.object(forKey: ruta as NSString) {
            listo(imagen)
            return
        }
        guard ruta.lowercased().hasPrefix("https://"), let url = URL(string: ruta) else {
            listo(inmediata(ruta))
            return
        }
        if esperando[ruta] != nil {
            esperando[ruta]?.append(listo)
            return
        }
        esperando[ruta] = [listo]
        let pedido = URLRequest(url: url, cachePolicy: .returnCacheDataElseLoad, timeoutInterval: 10)
        URLSession.shared.dataTask(with: pedido) { [weak self] datos, _, _ in
            let imagen = datos.flatMap { UIImage(data: $0) }.map { Imagenes.reducir($0, lado: 600) }
            DispatchQueue.main.async {
                guard let self else { return }
                if let imagen { self.guardadas.setObject(imagen, forKey: ruta as NSString) }
                let todos = self.esperando.removeValue(forKey: ruta) ?? []
                for aviso in todos { aviso(imagen) }
            }
        }.resume()
    }

    /// Las carátulas de AzuraCast pueden ser enormes; en el carro basta con 600 px.
    static func reducir(_ imagen: UIImage, lado: CGFloat) -> UIImage {
        let mayor = max(imagen.size.width, imagen.size.height)
        guard mayor > lado else { return imagen }
        let escala = lado / mayor
        let tamano = CGSize(width: imagen.size.width * escala, height: imagen.size.height * escala)
        let formato = UIGraphicsImageRendererFormat.default()
        formato.scale = 1
        return UIGraphicsImageRenderer(size: tamano, format: formato).image { _ in
            imagen.draw(in: CGRect(origin: .zero, size: tamano))
        }
    }
}
