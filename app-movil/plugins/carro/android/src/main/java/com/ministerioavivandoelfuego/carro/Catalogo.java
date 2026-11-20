package com.ministerioavivandoelfuego.carro;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * El catálogo de lo que se puede escuchar en el carro (Android Auto), en la pantalla bloqueada y en la
 * app. Es el mismo formato que en iPhone (Catalogo.swift) y en la web: carpetas con {@code hijos} y
 * elementos que suenan con {@code audio}. La lectura es tolerante: lo que no sirve se descarta.
 */
public final class Catalogo {

    /** Android Auto y CarPlay no dejan bajar mucho: más niveles no se muestran. */
    public static final int PROFUNDIDAD_MAXIMA = 5;

    /** Lo que suena: un directo (la radio) o un archivo (una lección, una prédica). */
    public static final class Audio {
        public final List<String> urls;
        public final boolean enVivo;
        /** Duración en segundos; 0 si no se sabe. */
        public final double duracion;
        public final List<String> metadatos;
        public final String artista;
        public final String album;

        Audio(List<String> urls, boolean enVivo, double duracion, List<String> metadatos, String artista, String album) {
            this.urls = Collections.unmodifiableList(urls);
            this.enVivo = enVivo;
            this.duracion = duracion;
            this.metadatos = Collections.unmodifiableList(metadatos);
            this.artista = artista;
            this.album = album;
        }
    }

    /** Una carpeta (tiene hijos) o algo que suena (tiene audio). */
    public static final class Nodo {
        public final String id;
        public final String titulo;
        public final String subtitulo;
        public final String imagen;
        public final String icono;
        public final String vacio;
        /** null si no es carpeta. */
        public final List<Nodo> hijos;
        /** null si no suena. */
        public final Audio audio;

        Nodo(String id, String titulo, String subtitulo, String imagen, String icono, String vacio, List<Nodo> hijos, Audio audio) {
            this.id = id;
            this.titulo = titulo;
            this.subtitulo = subtitulo;
            this.imagen = imagen;
            this.icono = icono;
            this.vacio = vacio;
            this.hijos = hijos == null ? null : Collections.unmodifiableList(hijos);
            this.audio = audio;
        }

        public boolean esCarpeta() {
            return hijos != null;
        }

        public boolean suena() {
            return audio != null;
        }

        public boolean esArchivo() {
            return audio != null && !audio.enVivo;
        }
    }

    public final int version;
    public final String titulo;
    public final List<Nodo> raiz;
    /** El texto tal como llegó (se guarda en el teléfono para la próxima vez). */
    public final String json;

    private Catalogo(int version, String titulo, List<Nodo> raiz, String json) {
        this.version = version;
        this.titulo = titulo;
        this.raiz = Collections.unmodifiableList(raiz);
        this.json = json;
    }

    public static Catalogo vacio(String titulo) {
        return new Catalogo(1, titulo, new ArrayList<>(), "{\"version\":1,\"titulo\":" + JSONObject.quote(titulo) + ",\"raiz\":[]}");
    }

    // ------------------------------------------------------------------ lectura

    public static Catalogo desde(String json) {
        if (json == null) return null;
        try {
            return desde(new JSONObject(json), json);
        } catch (JSONException e) {
            return null;
        }
    }

    public static Catalogo desde(JSONObject objeto) {
        return objeto == null ? null : desde(objeto, objeto.toString());
    }

    private static Catalogo desde(JSONObject objeto, String json) {
        JSONArray lista = objeto.optJSONArray("raiz");
        if (lista == null) return null;
        Set<String> vistos = new HashSet<>();
        List<Nodo> raiz = nodos(lista, vistos, 1);
        if (raiz.isEmpty()) return null;
        String titulo = texto(objeto, "titulo");
        return new Catalogo(objeto.optInt("version", 1), titulo != null ? titulo : "Avivando el Fuego", raiz, json);
    }

    private static List<Nodo> nodos(JSONArray lista, Set<String> vistos, int profundidad) {
        List<Nodo> nodos = new ArrayList<>();
        for (int i = 0; i < lista.length(); i++) {
            Nodo nodo = nodo(lista.optJSONObject(i), vistos, profundidad);
            if (nodo != null) nodos.add(nodo);
        }
        return nodos;
    }

    private static Nodo nodo(JSONObject o, Set<String> vistos, int profundidad) {
        if (o == null || profundidad > PROFUNDIDAD_MAXIMA) return null;
        String id = texto(o, "id");
        String titulo = texto(o, "titulo");
        if (id == null || titulo == null || vistos.contains(id)) return null;
        vistos.add(id);

        Audio audio = null;
        JSONObject a = o.optJSONObject("audio");
        if (a != null) {
            List<String> urls = enlaces(a.optJSONArray("urls"));
            if (!urls.isEmpty()) {
                double duracion = a.optDouble("duracion", 0);
                audio = new Audio(
                    urls,
                    a.optBoolean("enVivo", false),
                    Double.isNaN(duracion) || duracion < 0 ? 0 : duracion,
                    enlaces(a.optJSONArray("metadatos")),
                    texto(a, "artista"),
                    texto(a, "album")
                );
            }
        }
        List<Nodo> hijos = null;
        JSONArray lista = o.optJSONArray("hijos");
        if (audio == null && lista != null) hijos = nodos(lista, vistos, profundidad + 1);
        // Cada elemento suena o es una carpeta (aunque esté vacía); si no, no sirve en el carro.
        if (audio == null && hijos == null) return null;
        return new Nodo(id, titulo, texto(o, "subtitulo"), texto(o, "imagen"), texto(o, "icono"), texto(o, "vacio"), hijos, audio);
    }

    static String texto(JSONObject o, String clave) {
        if (o == null || o.isNull(clave)) return null;
        Object valor = o.opt(clave);
        if (!(valor instanceof String)) return null;
        String limpio = ((String) valor).trim();
        return limpio.isEmpty() ? null : limpio;
    }

    /** Solo direcciones https: la radio y la web van cifradas. */
    static List<String> enlaces(JSONArray lista) {
        List<String> enlaces = new ArrayList<>();
        if (lista == null) return enlaces;
        for (int i = 0; i < lista.length(); i++) {
            Object valor = lista.opt(i);
            if (!(valor instanceof String)) continue;
            String url = ((String) valor).trim();
            if (url.toLowerCase(Locale.ROOT).startsWith("https://") && url.length() > "https://".length()) enlaces.add(url);
        }
        return enlaces;
    }

    // ------------------------------------------------------------------ búsquedas

    public Nodo buscar(String id) {
        return buscar(raiz, id);
    }

    private static Nodo buscar(List<Nodo> nodos, String id) {
        if (id == null) return null;
        for (Nodo nodo : nodos) {
            if (nodo.id.equals(id)) return nodo;
            if (nodo.hijos != null) {
                Nodo encontrado = buscar(nodo.hijos, id);
                if (encontrado != null) return encontrado;
            }
        }
        return null;
    }

    /** La carpeta que contiene al elemento (null si está en la raíz o no existe). */
    public Nodo padre(String id) {
        return padre(raiz, id);
    }

    private static Nodo padre(List<Nodo> nodos, String id) {
        for (Nodo nodo : nodos) {
            if (nodo.hijos == null) continue;
            for (Nodo hijo : nodo.hijos) {
                if (hijo.id.equals(id)) return nodo;
            }
            Nodo encontrado = padre(nodo.hijos, id);
            if (encontrado != null) return encontrado;
        }
        return null;
    }

    /** Lo que sigue: los archivos de la misma carpeta (las lecciones de la materia). Un directo va solo. */
    public List<Nodo> cola(String id) {
        Nodo nodo = buscar(id);
        List<Nodo> cola = new ArrayList<>();
        if (nodo == null || nodo.audio == null) return cola;
        if (nodo.audio.enVivo) {
            cola.add(nodo);
            return cola;
        }
        Nodo padre = padre(id);
        List<Nodo> hermanos = padre != null ? padre.hijos : raiz;
        for (Nodo hermano : hermanos) {
            if (hermano.esArchivo()) cola.add(hermano);
        }
        if (cola.isEmpty()) cola.add(nodo);
        return cola;
    }

    public List<Nodo> queSuenan() {
        List<Nodo> lista = new ArrayList<>();
        recorrer(raiz, lista);
        return lista;
    }

    private static void recorrer(List<Nodo> nodos, List<Nodo> lista) {
        for (Nodo nodo : nodos) {
            if (nodo.suena()) lista.add(nodo);
            if (nodo.hijos != null) recorrer(nodo.hijos, lista);
        }
    }

    public Nodo primeroEnVivo() {
        for (Nodo nodo : queSuenan()) {
            if (nodo.audio.enVivo) return nodo;
        }
        return null;
    }

    static final Set<String> PALABRAS_VACIAS = new HashSet<>(Arrays.asList(
        "del", "los", "las", "una", "uno", "que", "con", "por", "para", "pon", "poner", "ponme", "reproduce",
        "reproducir", "escuchar", "escucha", "play", "app", "aplicacion", "quiero", "favor"
    ));

    /**
     * Lo que pidió el oyente por voz («Ok Google, pon la radio de Avivando el Fuego»). Sin consulta,
     * o si no se parece a nada, suena la radio en vivo (Android Auto lo exige: una consulta vacía
     * es «pon algo»).
     */
    public Nodo elegir(String consulta) {
        List<Nodo> todos = queSuenan();
        if (todos.isEmpty()) return null;
        Nodo vivo = primeroEnVivo();
        Nodo porDefecto = vivo != null ? vivo : todos.get(0);
        String frase = normalizar(consulta == null ? "" : consulta);
        if (frase.isEmpty()) return porDefecto;
        Set<String> palabras = new HashSet<>();
        for (String palabra : frase.split(" ")) {
            if (palabra.length() > 2 && !PALABRAS_VACIAS.contains(palabra)) palabras.add(palabra);
        }
        boolean pideLaRadio = palabras.contains("radio") || palabras.contains("vivo") || palabras.contains("emisora")
            || palabras.contains("directo");
        Nodo mejor = null;
        int mejoresPuntos = 0;
        for (Nodo nodo : todos) {
            String texto = normalizar(nodo.titulo + " " + nulo(nodo.subtitulo) + " " + nulo(nodo.audio.album) + " "
                + nulo(nodo.audio.artista));
            Set<String> fichas = new HashSet<>(Arrays.asList(texto.split(" ")));
            int puntos = 0;
            for (String palabra : palabras) {
                if (fichas.contains(palabra)) puntos += 2;
            }
            if (texto.contains(frase)) puntos += 10;
            if (pideLaRadio && nodo.audio.enVivo) puntos += 3;
            if (puntos > mejoresPuntos) {
                mejor = nodo;
                mejoresPuntos = puntos;
            }
        }
        return mejor != null ? mejor : porDefecto;
    }

    private static String nulo(String s) {
        return s == null ? "" : s;
    }

    /** Minúsculas, sin tildes ni signos: «¿La Oración?» → «la oracion». */
    static String normalizar(String texto) {
        String sinTildes = Normalizer.normalize(texto, Normalizer.Form.NFD).replaceAll("\\p{M}+", "");
        String[] partes = sinTildes.toLowerCase(Locale.ROOT).split("[^\\p{L}\\p{N}]+");
        StringBuilder resultado = new StringBuilder();
        for (String parte : partes) {
            if (parte.isEmpty()) continue;
            if (resultado.length() > 0) resultado.append(' ');
            resultado.append(parte);
        }
        return resultado.toString();
    }

    private static final Map<String, String> TILDES = new HashMap<>();

    static {
        TILDES.put("adoracion", "adoración");
        TILDES.put("ministracion", "ministración");
        TILDES.put("predicas", "prédicas");
        TILDES.put("predica", "prédica");
        TILDES.put("oracion", "oración");
        TILDES.put("programacion", "programación");
        TILDES.put("meditacion", "meditación");
        TILDES.put("reflexion", "reflexión");
        TILDES.put("ensenanza", "enseñanza");
        TILDES.put("ensenanzas", "enseñanzas");
        TILDES.put("biblia", "Biblia");
        TILDES.put("dia", "día");
        TILDES.put("manana", "mañana");
    }

    /** Las listas de AzuraCast se escribieron sin tildes; aquí se muestran bien escritas. */
    public static String conTildes(String texto) {
        if (texto == null) return "";
        StringBuilder resultado = new StringBuilder();
        StringBuilder palabra = new StringBuilder();
        for (int i = 0; i <= texto.length(); i++) {
            char letra = i < texto.length() ? texto.charAt(i) : ' ';
            boolean esLetra = i < texto.length() && letra < 128 && Character.isLetter(letra);
            if (esLetra) {
                palabra.append(letra);
                continue;
            }
            if (palabra.length() > 0) {
                String original = palabra.toString();
                String arreglada = TILDES.get(original.toLowerCase(Locale.ROOT));
                if (arreglada == null) {
                    resultado.append(original);
                } else if (Character.isUpperCase(original.charAt(0))) {
                    resultado.append(Character.toUpperCase(arreglada.charAt(0))).append(arreglada.substring(1));
                } else {
                    resultado.append(arreglada);
                }
                palabra.setLength(0);
            }
            if (i < texto.length()) resultado.append(letra);
        }
        return resultado.toString();
    }
}
