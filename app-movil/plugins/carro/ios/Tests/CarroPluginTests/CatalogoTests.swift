import CarPlay
import UIKit
import XCTest
@testable import CarroPlugin

final class CatalogoTests: XCTestCase {
    /// El mismo catálogo de ejemplo que usan las pruebas de Android (CatalogoTest.java).
    static let ejemplo = """
    {
      "version": 1,
      "titulo": "Avivando el Fuego",
      "raiz": [
        { "id": "radio", "titulo": "Radio", "icono": "radio", "hijos": [
          { "id": "radio:normal", "titulo": "Radio en vivo", "subtitulo": "Las 24 horas", "imagen": "icons/icon-512.png",
            "audio": { "urls": ["https://radio.ministerioavivandoelfuego.com/listen/avivando_el_fuego/radio.mp3",
                                "http://inseguro.example/radio.mp3",
                                "https://40.160.2.176.sslip.io/listen/avivando_el_fuego/radio.mp3"],
                       "enVivo": true,
                       "metadatos": ["https://radio.ministerioavivandoelfuego.com/api/nowplaying/avivando_el_fuego"] } },
          { "id": "radio:ligero", "titulo": "Radio · Ahorra datos",
            "audio": { "urls": ["https://radio.ministerioavivandoelfuego.com/listen/avivando_el_fuego/ligero.aac"], "enVivo": true } }
        ] },
        { "id": "academia", "titulo": "Academia", "icono": "academia", "vacio": "Inicia sesión", "hijos": [
          { "id": "materia:biblia", "titulo": "La Biblia", "hijos": [
            { "id": "leccion:biblia-1", "titulo": "1. Un libro único", "audio": { "urls": ["https://ministerioavivandoelfuego.com/voz/academia/n1-biblia-1.m4a"], "duracion": 334 } },
            { "id": "leccion:biblia-2", "titulo": "2. Cómo leerla", "audio": { "urls": ["https://ministerioavivandoelfuego.com/voz/academia/n1-biblia-2.m4a"], "duracion": 301 } },
            { "id": "leccion:rota", "titulo": "Sin audio" }
          ] }
        ] },
        { "id": "predicas", "titulo": "Prédicas", "icono": "predicas", "hijos": [] },
        { "id": "radio", "titulo": "Repetida", "hijos": [] }
      ]
    }
    """

    private func catalogo() throws -> CatalogoCarro {
        try XCTUnwrap(CatalogoCarro.desde(datos: Data(CatalogoTests.ejemplo.utf8)))
    }

    func testLeeElCatalogoYDescartaLoQueNoSirve() throws {
        let c = try catalogo()
        XCTAssertEqual(c.titulo, "Avivando el Fuego")
        // La carpeta con id repetido no entra.
        XCTAssertEqual(c.raiz.map(\.id), ["radio", "academia", "predicas"])
        let radio = try XCTUnwrap(c.buscar(id: "radio:normal"))
        // La dirección sin cifrar (http) se descarta.
        XCTAssertEqual(radio.audio?.urls.count, 2)
        XCTAssertEqual(radio.audio?.enVivo, true)
        XCTAssertEqual(radio.audio?.metadatos.count, 1)
        // Un elemento sin audio ni hijos no sirve en el carro.
        XCTAssertNil(c.buscar(id: "leccion:rota"))
        XCTAssertEqual(c.buscar(id: "predicas")?.hijos?.count, 0)
        XCTAssertEqual(c.buscar(id: "academia")?.vacio, "Inicia sesión")
    }

    func testUnCatalogoRotoNoSeAcepta() {
        XCTAssertNil(CatalogoCarro.desde(datos: Data("no es json".utf8)))
        XCTAssertNil(CatalogoCarro.desde(datos: Data(#"{"raiz": []}"#.utf8)))
        XCTAssertNil(CatalogoCarro.desde(datos: Data(#"{"raiz": [{"id": "x", "titulo": "Sin nada"}]}"#.utf8)))
    }

    func testLaColaSonLasLeccionesDeLaMateria() throws {
        let c = try catalogo()
        XCTAssertEqual(c.cola(de: "leccion:biblia-2").map(\.id), ["leccion:biblia-1", "leccion:biblia-2"])
        // Un directo va solo (no se pasa de la radio normal a la ligera con «siguiente»).
        XCTAssertEqual(c.cola(de: "radio:normal").map(\.id), ["radio:normal"])
        XCTAssertEqual(c.padre(de: "leccion:biblia-1")?.id, "materia:biblia")
        XCTAssertEqual(c.primeroEnVivo?.id, "radio:normal")
    }

    func testBusquedaPorVoz() throws {
        let c = try catalogo()
        XCTAssertEqual(c.elegir(consulta: nil)?.id, "radio:normal")
        XCTAssertEqual(c.elegir(consulta: "")?.id, "radio:normal")
        XCTAssertEqual(c.elegir(consulta: "Avivando el Fuego")?.id, "radio:normal")
        XCTAssertEqual(c.elegir(consulta: "pon la radio")?.id, "radio:normal")
        XCTAssertEqual(c.elegir(consulta: "cómo leerla")?.id, "leccion:biblia-2")
        XCTAssertEqual(c.elegir(consulta: "COMO LEERLA")?.id, "leccion:biblia-2")
        XCTAssertEqual(c.elegir(consulta: "algo que no existe")?.id, "radio:normal")
    }

    func testNormalizar() {
        XCTAssertEqual(CatalogoCarro.normalizar("¿La Oración, hoy?"), "la oracion hoy")
    }

    func testCancionDeAzuracast() throws {
        let json = """
        [{"is_online": true, "live": {"is_live": false, "streamer_name": ""},
          "now_playing": {"playlist": "Adoracion de la manana",
                          "song": {"title": "Cuán grande es Él", "artist": "", "art": "https://radio.ministerioavivandoelfuego.com/api/station/1/art/abc.jpg"}}}]
        """
        let cancion = try XCTUnwrap(Azuracast.cancion(desde: Data(json.utf8)))
        XCTAssertEqual(cancion.titulo, "Cuán grande es Él")
        // Sin artista, se muestra la lista con sus tildes.
        XCTAssertEqual(cancion.artista, "Adoración de la mañana")
        XCTAssertEqual(cancion.imagen, "https://radio.ministerioavivandoelfuego.com/api/station/1/art/abc.jpg")

        let vivo = #"{"live": {"is_live": true, "streamer_name": "Pastor Luis"}, "now_playing": {"song": {"title": "Culto", "art": "http://x/y.jpg"}}}"#
        let enVivo = try XCTUnwrap(Azuracast.cancion(desde: Data(vivo.utf8)))
        XCTAssertEqual(enVivo.artista, "En vivo con Pastor Luis")
        XCTAssertNil(enVivo.imagen)
        XCTAssertNil(Azuracast.cancion(desde: Data(#"{"otra": 1}"#.utf8)))
    }

    func testConTildes() {
        XCTAssertEqual(conTildes("Adoracion"), "Adoración")
        XCTAssertEqual(conTildes("predicas del dia"), "prédicas del día")
        XCTAssertEqual(conTildes("Ensenanza biblica"), "Enseñanza biblica")
    }

    func testGalletasSoloDelSitio() throws {
        let url = try XCTUnwrap(URL(string: "https://ministerioavivandoelfuego.com/api/carro/catalogo"))
        func galleta(_ dominio: String, ruta: String = "/", segura: Bool = true) -> HTTPCookie {
            var propiedades: [HTTPCookiePropertyKey: Any] = [.name: "connect.sid", .value: "abc", .domain: dominio, .path: ruta]
            if segura { propiedades[.secure] = "TRUE" }
            return HTTPCookie(properties: propiedades)!
        }
        XCTAssertTrue(FuenteCatalogo.galletaSirve(galleta("ministerioavivandoelfuego.com"), para: url))
        XCTAssertTrue(FuenteCatalogo.galletaSirve(galleta(".ministerioavivandoelfuego.com"), para: url))
        XCTAssertFalse(FuenteCatalogo.galletaSirve(galleta("otro-sitio.com"), para: url))
        XCTAssertFalse(FuenteCatalogo.galletaSirve(galleta("ministerioavivandoelfuego.com", ruta: "/admin"), para: url))
    }

    func testPestanasSoloSiLaRaizSonCarpetas() throws {
        XCTAssertTrue(CarroCarPlayDelegate.usaPestanas(try catalogo()))
        let radio = try XCTUnwrap(CatalogoCarro.desde(datos: Data("""
        {"titulo": "Radio", "raiz": [
          {"id": "radio", "titulo": "Radio en vivo", "audio": {"urls": ["https://a.example/r.mp3"], "enVivo": true}},
          {"id": "radio-ligero", "titulo": "Ahorra datos", "audio": {"urls": ["https://a.example/l.aac"], "enVivo": true}}
        ]}
        """.utf8)))
        XCTAssertFalse(CarroCarPlayDelegate.usaPestanas(radio))
        XCTAssertEqual(CarroCarPlayDelegate.simbolo("academia"), "graduationcap.fill")
        XCTAssertNotNil(UIImage(systemName: CarroCarPlayDelegate.simbolo("radio")))
        XCTAssertNotNil(UIImage(systemName: CarroCarPlayDelegate.simbolo("academia")))
        XCTAssertNotNil(UIImage(systemName: CarroCarPlayDelegate.simbolo("predicas")))
    }

    func testLaFotoSeCuentaIgualQueEnAndroid() {
        var foto = FotoCarro()
        foto.estado = .playing
        foto.id = "radio"
        let d = foto.diccionario
        XCTAssertEqual(d["estado"] as? String, "playing")
        XCTAssertEqual(d["id"] as? String, "radio")
        XCTAssertNotNil(d["duracion"] as? NSNull)
        XCTAssertNotNil(d["dormirA"] as? NSNull)
        XCTAssertEqual(Set(d.keys), ["estado", "id", "titulo", "artista", "imagen", "enVivo", "posicion", "duracion", "intento", "dormirA", "velocidad", "volumen"])
    }
}
