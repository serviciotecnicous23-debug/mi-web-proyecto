import Foundation

// El catálogo de lo que se puede escuchar en el carro (CarPlay), en la pantalla bloqueada y en la app.
// Es el mismo formato en iPhone, en Android (Catalogo.java) y en la web (src/audio/catalogoCarro.ts en
// la radio; server/carro.ts en la web del ministerio): carpetas con `hijos` y elementos que suenan
// con `audio`.
//
//   { "version": 1, "titulo": "Avivando el Fuego Radio",
//     "raiz": [ { "id": "radio", "titulo": "Radio en vivo", "imagen": "icons/icon-512.png",
//                 "audio": { "urls": ["https://…/radio.mp3"], "enVivo": true,
//                            "metadatos": ["https://…/api/nowplaying/avivando_el_fuego"] } } ] }

/// Lo que suena al elegir un elemento: un directo (la radio) o un archivo (una lección, una prédica).
public struct AudioCarro: Equatable {
    /// Direcciones del audio; en un directo, la principal y las de respaldo.
    public var urls: [URL]
    public var enVivo: Bool
    /// Duración en segundos (solo archivos), si se sabe.
    public var duracion: Double?
    /// Dónde preguntar qué canción suena en el directo (AzuraCast), en orden de preferencia.
    public var metadatos: [URL]
    public var artista: String?
    public var album: String?
}

/// Un elemento del catálogo: una carpeta (tiene `hijos`) o algo que suena (tiene `audio`).
public struct NodoCarro: Equatable {
    public var id: String
    public var titulo: String
    public var subtitulo: String?
    /// Carátula: dirección https o ruta dentro de la web de la app (por ejemplo `icons/icon-512.png`).
    public var imagen: String?
    /// Ícono de la pestaña en CarPlay: `radio`, `academia` o `predicas`.
    public var icono: String?
    /// Lo que se lee cuando la carpeta está vacía.
    public var vacio: String?
    public var hijos: [NodoCarro]?
    public var audio: AudioCarro?

    public var esCarpeta: Bool { hijos != nil }
    public var suena: Bool { audio != nil }
}

public struct CatalogoCarro: Equatable {
    public var version: Int
    public var titulo: String
    public var raiz: [NodoCarro]

    /// CarPlay y Android Auto no dejan bajar mucho: más niveles no se muestran.
    public static let profundidadMaxima = 5

    public init(version: Int = 1, titulo: String, raiz: [NodoCarro]) {
        self.version = version
        self.titulo = titulo
        self.raiz = raiz
    }

    /// Un catálogo sin nada (antes de la primera configuración).
    public static func vacio(titulo: String) -> CatalogoCarro {
        CatalogoCarro(titulo: titulo, raiz: [])
    }

    // MARK: - Lectura (tolerante: lo que no sirve se descarta, nunca deja la app muda)

    public static func desde(datos: Data) -> CatalogoCarro? {
        guard let json = try? JSONSerialization.jsonObject(with: datos) else { return nil }
        return desde(json: json)
    }

    public static func desde(json: Any) -> CatalogoCarro? {
        guard let objeto = json as? [String: Any], let lista = objeto["raiz"] as? [Any] else { return nil }
        var vistos = Set<String>()
        let raiz = lista.compactMap { nodo(desde: $0, vistos: &vistos, profundidad: 1) }
        guard !raiz.isEmpty else { return nil }
        let version = (objeto["version"] as? NSNumber)?.intValue ?? 1
        return CatalogoCarro(version: version, titulo: textoDe(objeto["titulo"]) ?? "Avivando el Fuego", raiz: raiz)
    }

    private static func nodo(desde valor: Any, vistos: inout Set<String>, profundidad: Int) -> NodoCarro? {
        guard profundidad <= profundidadMaxima,
              let o = valor as? [String: Any],
              let id = textoDe(o["id"]),
              let titulo = textoDe(o["titulo"]),
              !vistos.contains(id)
        else { return nil }
        vistos.insert(id)

        var audio: AudioCarro?
        if let a = o["audio"] as? [String: Any] {
            let urls = enlacesDe(a["urls"])
            if !urls.isEmpty {
                audio = AudioCarro(
                    urls: urls,
                    enVivo: (a["enVivo"] as? Bool) ?? false,
                    duracion: numeroDe(a["duracion"]),
                    metadatos: enlacesDe(a["metadatos"]),
                    artista: textoDe(a["artista"]),
                    album: textoDe(a["album"]))
            }
        }
        var hijos: [NodoCarro]?
        if audio == nil, let lista = o["hijos"] as? [Any] {
            hijos = lista.compactMap { nodo(desde: $0, vistos: &vistos, profundidad: profundidad + 1) }
        }
        // Cada elemento suena o es una carpeta (aunque esté vacía); si no, no sirve en el carro.
        guard audio != nil || hijos != nil else { return nil }
        return NodoCarro(
            id: id,
            titulo: titulo,
            subtitulo: textoDe(o["subtitulo"]),
            imagen: textoDe(o["imagen"]),
            icono: textoDe(o["icono"]),
            vacio: textoDe(o["vacio"]),
            hijos: hijos,
            audio: audio)
    }

    // MARK: - Búsquedas

    public func buscar(id: String) -> NodoCarro? {
        func en(_ nodos: [NodoCarro]) -> NodoCarro? {
            for nodo in nodos {
                if nodo.id == id { return nodo }
                if let hijos = nodo.hijos, let encontrado = en(hijos) { return encontrado }
            }
            return nil
        }
        return en(raiz)
    }

    /// La carpeta que contiene al elemento (nil si está en la raíz o no existe).
    public func padre(de id: String) -> NodoCarro? {
        func en(_ nodos: [NodoCarro]) -> NodoCarro? {
            for nodo in nodos {
                guard let hijos = nodo.hijos else { continue }
                if hijos.contains(where: { $0.id == id }) { return nodo }
                if let encontrado = en(hijos) { return encontrado }
            }
            return nil
        }
        return en(raiz)
    }

    /// Lo que sigue después: los demás elementos que suenan en la misma carpeta (las lecciones de la
    /// materia, en orden). Un directo va solo.
    public func cola(de id: String) -> [NodoCarro] {
        guard let nodo = buscar(id: id), let audio = nodo.audio else { return [] }
        if audio.enVivo { return [nodo] }
        let hermanos = padre(de: id)?.hijos ?? raiz
        let archivos = hermanos.filter { $0.audio.map { !$0.enVivo } ?? false }
        return archivos.isEmpty ? [nodo] : archivos
    }

    /// Todo lo que suena, en el orden del catálogo.
    public var queSuenan: [NodoCarro] {
        var lista: [NodoCarro] = []
        func recorrer(_ nodos: [NodoCarro]) {
            for nodo in nodos {
                if nodo.suena { lista.append(nodo) }
                if let hijos = nodo.hijos { recorrer(hijos) }
            }
        }
        recorrer(raiz)
        return lista
    }

    public var primeroEnVivo: NodoCarro? {
        queSuenan.first { $0.audio?.enVivo == true }
    }

    /// Lo que pidió el oyente por voz («Oye Siri / Ok Google, pon la radio de Avivando el Fuego»).
    /// Sin consulta, o si no se parece a nada, suena la radio en vivo.
    public func elegir(consulta: String?) -> NodoCarro? {
        let todos = queSuenan
        guard let porDefecto = primeroEnVivo ?? todos.first else { return nil }
        let frase = CatalogoCarro.normalizar(consulta ?? "")
        if frase.isEmpty { return porDefecto }
        let palabras = Set(frase.split(separator: " ").map(String.init).filter {
            $0.count > 2 && !CatalogoCarro.palabrasVacias.contains($0)
        })
        let pideLaRadio = !palabras.isDisjoint(with: ["radio", "vivo", "emisora", "directo"])
        var mejor: NodoCarro?
        var mejoresPuntos = 0
        for nodo in todos {
            let texto = CatalogoCarro.normalizar(
                [nodo.titulo, nodo.subtitulo ?? "", nodo.audio?.album ?? "", nodo.audio?.artista ?? ""].joined(separator: " "))
            let fichas = Set(texto.split(separator: " ").map(String.init))
            var puntos = palabras.intersection(fichas).count * 2
            if texto.contains(frase) { puntos += 10 }
            if pideLaRadio, nodo.audio?.enVivo == true { puntos += 3 }
            if puntos > mejoresPuntos {
                mejor = nodo
                mejoresPuntos = puntos
            }
        }
        return mejor ?? porDefecto
    }

    static let palabrasVacias: Set<String> = [
        "del", "los", "las", "una", "uno", "que", "con", "por", "para", "pon", "poner", "ponme", "reproduce",
        "reproducir", "escuchar", "escucha", "play", "app", "aplicacion", "quiero", "favor",
    ]

    /// Minúsculas, sin tildes ni signos: «¿La Oración?» → «la oracion».
    static func normalizar(_ texto: String) -> String {
        let plano = texto.folding(options: [.diacriticInsensitive, .caseInsensitive, .widthInsensitive], locale: Locale(identifier: "es"))
        return plano.lowercased()
            .components(separatedBy: CharacterSet.alphanumerics.inverted)
            .filter { !$0.isEmpty }
            .joined(separator: " ")
    }
}

// MARK: - Ayudas de lectura

func textoDe(_ valor: Any?) -> String? {
    guard let s = valor as? String else { return nil }
    let limpio = s.trimmingCharacters(in: .whitespacesAndNewlines)
    return limpio.isEmpty ? nil : limpio
}

func numeroDe(_ valor: Any?) -> Double? {
    guard let n = valor as? NSNumber else { return nil }
    let d = n.doubleValue
    return d.isFinite && d > 0 ? d : nil
}

/// Solo direcciones https: la radio y la web van cifradas.
func enlacesDe(_ valor: Any?) -> [URL] {
    guard let lista = valor as? [Any] else { return [] }
    return lista.compactMap { item in
        guard let texto = textoDe(item), let url = URL(string: texto), url.scheme?.lowercased() == "https", url.host != nil else {
            return nil
        }
        return url
    }
}

/// Las listas de AzuraCast se escribieron sin tildes; aquí se muestran bien escritas (igual que la app web).
private let tildes: [String: String] = [
    "adoracion": "adoración", "ministracion": "ministración", "predicas": "prédicas", "predica": "prédica",
    "oracion": "oración", "programacion": "programación", "meditacion": "meditación", "reflexion": "reflexión",
    "ensenanza": "enseñanza", "ensenanzas": "enseñanzas", "biblia": "Biblia", "dia": "día", "manana": "mañana",
]

public func conTildes(_ texto: String) -> String {
    var resultado = ""
    var palabra = ""
    func cerrar() {
        guard !palabra.isEmpty else { return }
        if let arreglada = tildes[palabra.lowercased()] {
            if let primera = palabra.first, primera.isUppercase {
                resultado += arreglada.prefix(1).uppercased() + arreglada.dropFirst()
            } else {
                resultado += arreglada
            }
        } else {
            resultado += palabra
        }
        palabra = ""
    }
    for letra in texto {
        if letra.isASCII && letra.isLetter {
            palabra.append(letra)
        } else {
            cerrar()
            resultado.append(letra)
        }
    }
    cerrar()
    return resultado
}
