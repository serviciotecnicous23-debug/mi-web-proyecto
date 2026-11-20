package com.ministerioavivandoelfuego.carro;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;
import org.junit.Test;

/** Las mismas comprobaciones que en iPhone (CatalogoTests.swift), con el mismo catálogo de ejemplo. */
public class CatalogoTest {

    static final String EJEMPLO = "{\n"
        + "  \"version\": 1,\n"
        + "  \"titulo\": \"Avivando el Fuego\",\n"
        + "  \"raiz\": [\n"
        + "    { \"id\": \"radio\", \"titulo\": \"Radio\", \"icono\": \"radio\", \"hijos\": [\n"
        + "      { \"id\": \"radio:normal\", \"titulo\": \"Radio en vivo\", \"subtitulo\": \"Las 24 horas\", \"imagen\": \"icons/icon-512.png\",\n"
        + "        \"audio\": { \"urls\": [\"https://radio.ministerioavivandoelfuego.com/listen/avivando_el_fuego/radio.mp3\",\n"
        + "                            \"http://inseguro.example/radio.mp3\",\n"
        + "                            \"https://40.160.2.176.sslip.io/listen/avivando_el_fuego/radio.mp3\"],\n"
        + "                   \"enVivo\": true,\n"
        + "                   \"metadatos\": [\"https://radio.ministerioavivandoelfuego.com/api/nowplaying/avivando_el_fuego\"] } },\n"
        + "      { \"id\": \"radio:ligero\", \"titulo\": \"Radio · Ahorra datos\",\n"
        + "        \"audio\": { \"urls\": [\"https://radio.ministerioavivandoelfuego.com/listen/avivando_el_fuego/ligero.aac\"], \"enVivo\": true } }\n"
        + "    ] },\n"
        + "    { \"id\": \"academia\", \"titulo\": \"Academia\", \"icono\": \"academia\", \"vacio\": \"Inicia sesión\", \"hijos\": [\n"
        + "      { \"id\": \"materia:biblia\", \"titulo\": \"La Biblia\", \"hijos\": [\n"
        + "        { \"id\": \"leccion:biblia-1\", \"titulo\": \"1. Un libro único\", \"audio\": { \"urls\": [\"https://ministerioavivandoelfuego.com/voz/academia/n1-biblia-1.m4a\"], \"duracion\": 334 } },\n"
        + "        { \"id\": \"leccion:biblia-2\", \"titulo\": \"2. Cómo leerla\", \"audio\": { \"urls\": [\"https://ministerioavivandoelfuego.com/voz/academia/n1-biblia-2.m4a\"], \"duracion\": 301 } },\n"
        + "        { \"id\": \"leccion:rota\", \"titulo\": \"Sin audio\" }\n"
        + "      ] }\n"
        + "    ] },\n"
        + "    { \"id\": \"predicas\", \"titulo\": \"Prédicas\", \"icono\": \"predicas\", \"hijos\": [] },\n"
        + "    { \"id\": \"radio\", \"titulo\": \"Repetida\", \"hijos\": [] }\n"
        + "  ]\n"
        + "}";

    private static Catalogo catalogo() {
        Catalogo c = Catalogo.desde(EJEMPLO);
        assertNotNull(c);
        return c;
    }

    private static List<String> ids(List<Catalogo.Nodo> nodos) {
        List<String> ids = new ArrayList<>();
        for (Catalogo.Nodo nodo : nodos) ids.add(nodo.id);
        return ids;
    }

    @Test
    public void leeElCatalogoYDescartaLoQueNoSirve() {
        Catalogo c = catalogo();
        assertEquals("Avivando el Fuego", c.titulo);
        assertEquals(List.of("radio", "academia", "predicas"), ids(c.raiz));
        Catalogo.Nodo radio = c.buscar("radio:normal");
        assertNotNull(radio);
        assertEquals(2, radio.audio.urls.size());
        assertTrue(radio.audio.enVivo);
        assertEquals(1, radio.audio.metadatos.size());
        assertNull(c.buscar("leccion:rota"));
        assertEquals(0, c.buscar("predicas").hijos.size());
        assertEquals("Inicia sesión", c.buscar("academia").vacio);
        assertEquals(334, c.buscar("leccion:biblia-1").audio.duracion, 0.001);
    }

    @Test
    public void unCatalogoRotoNoSeAcepta() {
        assertNull(Catalogo.desde("no es json"));
        assertNull(Catalogo.desde("{\"raiz\": []}"));
        assertNull(Catalogo.desde("{\"raiz\": [{\"id\": \"x\", \"titulo\": \"Sin nada\"}]}"));
        assertNull(Catalogo.desde((String) null));
    }

    @Test
    public void laColaSonLasLeccionesDeLaMateria() {
        Catalogo c = catalogo();
        assertEquals(List.of("leccion:biblia-1", "leccion:biblia-2"), ids(c.cola("leccion:biblia-2")));
        assertEquals(List.of("radio:normal"), ids(c.cola("radio:normal")));
        assertEquals("materia:biblia", c.padre("leccion:biblia-1").id);
        assertEquals("radio:normal", c.primeroEnVivo().id);
    }

    @Test
    public void busquedaPorVoz() {
        Catalogo c = catalogo();
        assertEquals("radio:normal", c.elegir(null).id);
        assertEquals("radio:normal", c.elegir("").id);
        assertEquals("radio:normal", c.elegir("Avivando el Fuego").id);
        assertEquals("radio:normal", c.elegir("pon la radio").id);
        assertEquals("leccion:biblia-2", c.elegir("cómo leerla").id);
        assertEquals("leccion:biblia-2", c.elegir("COMO LEERLA").id);
        assertEquals("radio:normal", c.elegir("algo que no existe").id);
    }

    @Test
    public void normalizar() {
        assertEquals("la oracion hoy", Catalogo.normalizar("¿La Oración, hoy?"));
    }

    @Test
    public void conTildes() {
        assertEquals("Adoración", Catalogo.conTildes("Adoracion"));
        assertEquals("prédicas del día", Catalogo.conTildes("predicas del dia"));
        assertEquals("Enseñanza biblica", Catalogo.conTildes("Ensenanza biblica"));
    }

    @Test
    public void cancionDeAzuracast() {
        String json = "[{\"is_online\": true, \"live\": {\"is_live\": false, \"streamer_name\": \"\"},"
            + " \"now_playing\": {\"playlist\": \"Adoracion de la manana\","
            + " \"song\": {\"title\": \"Cuán grande es Él\", \"artist\": \"\", \"art\": \"https://radio.ministerioavivandoelfuego.com/api/station/1/art/abc.jpg\"}}}]";
        Azuracast.Cancion cancion = Azuracast.leer(json);
        assertNotNull(cancion);
        assertEquals("Cuán grande es Él", cancion.titulo);
        assertEquals("Adoración de la mañana", cancion.artista);
        assertEquals("https://radio.ministerioavivandoelfuego.com/api/station/1/art/abc.jpg", cancion.imagen);

        Azuracast.Cancion vivo = Azuracast.leer("{\"live\": {\"is_live\": true, \"streamer_name\": \"Pastor Luis\"},"
            + " \"now_playing\": {\"song\": {\"title\": \"Culto\", \"art\": \"http://x/y.jpg\"}}}");
        assertNotNull(vivo);
        assertEquals("En vivo con Pastor Luis", vivo.artista);
        assertNull(vivo.imagen);
        assertNull(Azuracast.leer("{\"otra\": 1}"));
        assertNull(Azuracast.leer("roto"));
        assertEquals(cancion, Azuracast.leer(json));
        assertFalse(cancion.equals(vivo));
    }

    @Test
    public void esperasComoLaAppWeb() {
        assertEquals(1000, Reintentos.espera(1));
        assertEquals(2000, Reintentos.espera(2));
        assertEquals(4000, Reintentos.espera(3));
        assertEquals(8000, Reintentos.espera(4));
        assertEquals(15000, Reintentos.espera(5));
        assertEquals(30000, Reintentos.espera(6));
        assertEquals(30000, Reintentos.espera(60));
        assertEquals(1000, Reintentos.espera(0));
    }
}
