package com.ministerioavivandoelfuego.carro;

import java.util.Locale;
import java.util.Objects;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/** Lo que suena ahora en el directo, como lo cuenta AzuraCast ({@code /api/nowplaying/<emisora>}). */
final class Azuracast {

    static final class Cancion {
        final String titulo;
        final String artista;
        /** Carátula https o null. */
        final String imagen;

        Cancion(String titulo, String artista, String imagen) {
            this.titulo = titulo;
            this.artista = artista;
            this.imagen = imagen;
        }

        @Override
        public boolean equals(Object otro) {
            if (!(otro instanceof Cancion)) return false;
            Cancion c = (Cancion) otro;
            return titulo.equals(c.titulo) && artista.equals(c.artista) && Objects.equals(imagen, c.imagen);
        }

        @Override
        public int hashCode() {
            return Objects.hash(titulo, artista, imagen);
        }
    }

    private Azuracast() {}

    static Cancion leer(String json) {
        if (json == null) return null;
        try {
            Object raiz = json.trim().startsWith("[") ? new JSONArray(json).opt(0) : new JSONObject(json);
            if (!(raiz instanceof JSONObject)) return null;
            JSONObject o = (JSONObject) raiz;
            JSONObject ahora = o.optJSONObject("now_playing");
            if (ahora == null) return null;
            JSONObject cancion = ahora.optJSONObject("song");
            String titulo = Catalogo.texto(cancion, "title");
            if (titulo == null) titulo = Catalogo.texto(cancion, "text");
            if (titulo == null) titulo = "";
            String artista = Catalogo.texto(cancion, "artist");
            JSONObject vivo = o.optJSONObject("live");
            if (artista == null && vivo != null && vivo.optBoolean("is_live", false)) {
                String locutor = Catalogo.texto(vivo, "streamer_name");
                if (locutor != null) artista = "En vivo con " + locutor;
            }
            if (artista == null) {
                String lista = Catalogo.texto(ahora, "playlist");
                if (lista != null) artista = Catalogo.conTildes(lista);
            }
            if (artista == null || artista.isEmpty()) artista = "En vivo";
            String imagen = Catalogo.texto(cancion, "art");
            if (imagen != null && !imagen.toLowerCase(Locale.ROOT).startsWith("https://")) imagen = null;
            return new Cancion(titulo, artista, imagen);
        } catch (JSONException e) {
            return null;
        }
    }
}
